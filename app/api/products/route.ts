// app/api/products/route.ts
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const file = path.join(process.cwd(), 'data', 'products.json');

export async function GET() {
  const raw = await fs.readFile(file, 'utf-8').catch(() => '[]');
  const products = JSON.parse(raw);
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newProduct = { id: Date.now().toString(), ...body };
    const raw = await fs.readFile(file, 'utf-8').catch(() => '[]');
    const products = JSON.parse(raw);
    products.push(newProduct);
    await fs.writeFile(file, JSON.stringify(products, null, 2), 'utf-8');
    return NextResponse.json(newProduct, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Ne mogu da dodam proizvod' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const raw = await fs.readFile(file, 'utf-8').catch(() => '[]');
    const products = JSON.parse(raw).filter((p: any) => p.id !== id);
    await fs.writeFile(file, JSON.stringify(products, null, 2), 'utf-8');
    return NextResponse.json({ id });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Ne mogu da obrišem proizvod' }, { status: 500 });
  }
}
