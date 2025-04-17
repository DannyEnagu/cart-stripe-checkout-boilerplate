'use client'

import { Product } from "@/constants/type"
import { useCart } from "@/store/cart-store"
import { Button } from "primereact/button"
import Image from "next/image"

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()

  return (
    <div className="border rounded-xl p-4 shadow">
      {/* <Image src={product.image} alt={product.name} className="w-full h-40 object-cover rounded" /> */}
      <h2 className="text-xl font-semibold mt-2">{product.name}</h2>
      <p className="text-sm text-gray-500 mb-2">${(product.price / 100).toFixed(2)}</p>
      <Button
        severity="secondary"
        rounded
        outlined
        className="!text-sm bg-white text-primary !font-bold !py-2"
        onClick={() => addItem(product)}
      >
        <Image src="./assets/images/icon-add-to-cart.svg" alt="Add to cart icon" width={20} height={20} />
        <span className="ml-2">Add to Cart</span>
      </Button>
    </div>
  )
}