// app/api/products/route.ts
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json(data)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { data, error } = await supabase.from('products').insert([body]).select().single()

    if (error) throw error

    return NextResponse.json(data, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Ne mogu da dodam proizvod' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()
    const { error } = await supabase.from('products').delete().eq('id', id)

    if (error) throw error

    return NextResponse.json({ id })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Ne mogu da obrišem proizvod' }, { status: 500 })
  }
}
