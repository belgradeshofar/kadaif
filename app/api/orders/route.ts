import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import nodemailer from 'nodemailer';

async function sendOrderEmail(order: any) {
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

  const itemsHtml = order.items
    .map(
      (i: any) =>
        `<li>${i.name} x ${i.quantity} — ${i.price * i.quantity} RSD</li>`
    )
    .join('');

  const address = order.customer?.address || {};
  const html = `
    <h2>Nova porudžbina</h2>
    <p><strong>Vreme:</strong> ${order.createdAt}</p>
    <h3>Kupac:</h3>
    <p>${order.customer?.firstName || ''} ${order.customer?.lastName || ''}</p>
    <p>Email: ${order.customer?.email || 'nije uneto'}</p>
    <p>Telefon: ${order.customer?.phone || ''}</p>
    <h3>Adresa:</h3>
    <p>${address.street || ''} ${address.streetNumber || ''}, ${address.city || ''}, ${address.postalCode || ''}</p>
    <h3>Stavke:</h3>
    <ul>${itemsHtml}</ul>
    <p><strong>Ukupno:</strong> ${order.total} RSD</p>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    subject: `Nova porudžbina`,
    html,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const timestamp = new Date().toISOString();

    // ⚠️ Ne šaljemo `id` jer Supabase generiše UUID sam
    const newOrder = {
      createdAt: timestamp,
      customer: body.customer,
      items: body.items,
      subtotal: body.subtotal,
      deliveryType: body.deliveryType,
      deliveryCost: body.deliveryCost,
      total: body.total,
      paymentMethod: body.paymentMethod,
    };

    const { data, error } = await supabase.from('orders').insert([newOrder]).select('id');
    if (error) {
      console.error("❌ Greška prilikom upisa u Supabase:", error);
      return NextResponse.json(
        { error: 'Greška prilikom čuvanja porudžbine u bazi.' },
        { status: 500 }
      );
    }

    const insertedId = data?.[0]?.id;

    await sendOrderEmail({ ...newOrder, id: insertedId });
    return NextResponse.json({ success: true, orderId: insertedId }, { status: 201 });

  } catch (err) {
    console.error('❌ Neuspela obrada porudžbine:', err);
    return NextResponse.json(
      { error: 'Došlo je do greške prilikom slanja porudžbine.' },
      { status: 500 }
    );
  }
}
