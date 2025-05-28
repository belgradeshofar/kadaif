// app/api/orders/route.ts
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';

const ordersFile = path.join(process.cwd(), 'data', 'orders.json');

async function sendOrderEmail(order: any) {
  console.log('→ SMTP config:', {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE,
    user: process.env.EMAIL_USER,
  });

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT || 587),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: { rejectUnauthorized: false },
  });

  try {
    await transporter.verify();
    console.log('✅ SMTP connection & auth OK');
  } catch (verifyErr) {
    console.error('❌ SMTP verify failed:', verifyErr);
    throw verifyErr;
  }

  const itemsHtml = order.items
    .map(
      (i: any) =>
        `<li>${i.name} x ${i.quantity} — ${i.price * i.quantity} RSD</li>`
    )
    .join('');

  const html = `
    <h2>Nova porudžbina #${order.id}</h2>
    <p><strong>Vreme:</strong> ${order.createdAt}</p>
    <h3>Kupac:</h3>
    <p>${order.customer.firstName} ${order.customer.lastName}</p>
    <p>Email: ${order.customer.email}</p>
    <p>Telefon: ${order.customer.phone}</p>
    <h3>Adresa:</h3>
    <p>${order.customer.address.street} ${order.customer.address.streetNumber}, ${order.customer.address.city}, ${order.customer.address.postalCode}</p>
    <h3>Stavke:</h3>
    <ul>${itemsHtml}</ul>
    <p><strong>Ukupno:</strong> ${order.total} RSD</p>
  `;

  const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    subject: `Nova porudžbina #${order.id}`,
    html,
  });

  console.log('✉️  Email sent:', info.messageId);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const timestamp = new Date().toISOString();
    const newOrder = { id: Date.now().toString(), createdAt: timestamp, ...body };

    await fs.mkdir(path.dirname(ordersFile), { recursive: true });
    const raw = await fs.readFile(ordersFile, 'utf-8').catch(() => '[]');
    const orders = JSON.parse(raw);
    orders.push(newOrder);
    await fs.writeFile(ordersFile, JSON.stringify(orders, null, 2), 'utf-8');

    await sendOrderEmail(newOrder);

    return NextResponse.json({ success: true, orderId: newOrder.id }, { status: 201 });
  } catch (err) {
    console.error('POST /api/orders error:', err);
    if (err instanceof Error) console.error(err.stack);
    return NextResponse.json(
      { error: 'Došlo je do greške prilikom slanja porudžbine.' },
      { status: 500 }
    );
  }
}
