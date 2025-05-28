// app/api/orders/route.ts
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import nodemailer from 'nodemailer'

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
  })

  const itemsHtml = order.items
    .map((i: any) => `<li>${i.name} x ${i.quantity} — ${i.price * i.quantity} RSD</li>`)
    .join('')

  const html = `
    <h2>Nova porudžbina #${order.id}</h2>
    <p><strong>Vreme:</strong> ${order.created_at}</p>
    <h3>Kupac:</h3>
    <p>${order.customer.firstName} ${order.customer.lastName}</p>
    <p>Email: ${order.customer.email}</p>
    <p>Telefon: ${order.customer.phone}</p>
    <h3>Adresa:</h3>
    <p>${order.customer.address.street} ${order.customer.address.streetNumber}, ${order.customer.address.city}, ${order.customer.address.postalCode}</p>
    <h3>Stavke:</h3>
    <ul>${itemsHtml}</ul>
    <p><strong>Ukupno:</strong> ${order.total} RSD</p>
  `

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    subject: `Nova porudžbina #${order.id}`,
    html,
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const { data, error } = await supabase.from('orders').insert([body]).select().single()
    if (error) throw error

    await sendOrderEmail(data)

    return NextResponse.json({ success: true, orderId: data.id }, { status: 201 })
  } catch (err) {
    console.error('POST /api/orders error:', err)
    return NextResponse.json(
      { error: 'Došlo je do greške prilikom slanja porudžbine.' },
      { status: 500 }
    )
  }
}
