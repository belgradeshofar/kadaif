// app/product/[id]/page.tsx
import path from 'path';
import { promises as fs } from 'fs';
import ProductDetail from '../../../components/ProductDetail';

interface RawProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  sizeOptions?: string[];
}

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  // ⬇️ await params pre upotrebe
  const { id } = await params;

  const dataFile = path.join(process.cwd(), 'data', 'products.json');
  let products: RawProduct[] = [];
  try {
    const json = await fs.readFile(dataFile, 'utf-8');
    products = JSON.parse(json);
  } catch {
    products = [];
  }

  const product = products.find((p) => p.id === id);
  if (!product) {
    return <h1 className="text-center mt-20 text-xl">Proizvod nije pronađen.</h1>;
  }

  const formatted = {
    ...product,
    price: `${product.price.toFixed(0)} RSD`,
  };

  return <ProductDetail product={formatted} />;
}
