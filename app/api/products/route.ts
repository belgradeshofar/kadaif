

// app/api/products/route.ts
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// Generiše osnovni slug iz imena
function slugify(name: string) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export async function GET() {
  const { data, error } = await supabase
    .from('products')
    .select('id, slug, name, price, image_url, description, category, stock, is_featured')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('❌ GET /api/products error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const products = data.map(p => ({
    id:         p.id,
    slug:       p.slug!,
    name:       p.name,
    price:      Number(p.price),
    image:      p.image_url,
    description:p.description ?? '',
    category:   p.category,
    stock:      p.stock,
    isFeatured: p.is_featured,
  }))

  return NextResponse.json(products)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    // 1) Napravi osnovni slug
    let baseSlug = slugify(body.name)

    // 2) Proveri da li već postoji u bazi
    const { data: existing, error: fetchError } = await supabase
      .from('products')
      .select('slug')
      .eq('slug', baseSlug)
      .limit(1)
      .single()

    if (fetchError && fetchError.code !== 'PGRST116') {
      // PGRST116 = no rows, ignoriši
      throw fetchError
    }

    // 3) Ako postoji, dodaj sufiks timestamp
    const finalSlug = existing
      ? `${baseSlug}-${Date.now()}`
      : baseSlug

    // 4) Ubaci novi proizvod sa garantovano jedinstvenim slugom
    const { data, error: insertError } = await supabase
      .from('products')
      .insert([{
        name:         body.name,
        slug:         finalSlug,
        price:        body.price,
        image_url:    body.image,
        category:     body.category,
        description:  body.description,
        stock:        body.stock,
        is_featured:  body.isFeatured,
      }])
      .select('id, slug, name, price, image_url, description, category, stock, is_featured')
      .single()

    if (insertError) throw insertError

    const newProduct = {
      id:         data.id,
      slug:       data.slug,
      name:       data.name,
      price:      Number(data.price),
      image:      data.image_url,
      description:data.description ?? '',
      category:   data.category,
      stock:      data.stock,
      isFeatured: data.is_featured,
    }

    return NextResponse.json(newProduct, { status: 201 })
  } catch (err: any) {
    console.error('❌ POST /api/products error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)

    if (error) throw error
    return NextResponse.json({ id })
  } catch (err: any) {
    console.error('❌ DELETE /api/products error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
