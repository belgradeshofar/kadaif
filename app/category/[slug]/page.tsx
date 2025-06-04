// app/product/[id]/page.tsx

import ProductDetail from '../../components/ProductDetail'
import productsData from '../../../data/products.json'

interface RawProduct {
  id: string
  name: string
  price: number | string
  image: string
  description?: string
  sizeOptions?: string[]
}

interface FormattedProduct {
  id: string
  name: string
  price: string
  image: string
  description?: string
  sizeOptions?: string[]
}

export default function ProductPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params
  const allProducts: RawProduct[] = productsData

  // pronađi proizvod po ID-ju
  const product = allProducts.find((p) => p.id === id)

  if (!product) {
    return (
      <h1 className="text-center mt-20 text-xl">
        Proizvod nije pronađen.
      </h1>
    )
  }

  const formatted: FormattedProduct = {
    ...product,
    price: `${Number(product.price).toFixed(0)} RSD`,
  }

  return <ProductDetail product={formatted} />
}
