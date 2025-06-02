export const runtime = 'edge';

// app/product/[slug]/page.tsx
import ProductDetail from '../../../components/ProductDetail';
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';

interface DbProduct {
  id:          string;
  name:        string;
  price:       number;
  image_url:   string;
  description: string | null;
}

interface Product {
  id:          string;
  name:        string;
  price:       string;
  image:       string;
  description?: string;
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const { data, error } = await supabase
    .from('products')
    .select('id, name, price, image_url, description')
    .eq('slug', params.slug)
    .single();

  if (error || !data) {
    return notFound();
  }

  const product: Product = {
    id:          data.id,
    name:        data.name,
    price:       `${data.price.toFixed(0)} RSD`,
    image:       data.image_url,
    description: data.description ?? undefined,
  };

  return <ProductDetail product={product} />;
}
