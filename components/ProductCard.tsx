'use client'

import { Product } from "@/constants/type"
import { AddToCart } from "./AddToCart"
import Image from "next/image";
import { useMemo } from "react";
import { useCart } from "@/store/cart-store";

const imageSizes = `  
(max-width: 767px) 100vw, /* On small screens, image takes up 100% of viewport width */  
(max-width: 1023px) 50vw, /* On medium screens, image takes up 50% of viewport width */  
33vw /* On large screens and up, image takes up 33% of viewport width */  
`;

export default function ProductCard({ product }: { product: Product }) {
  const { items } = useCart();
  const productCount = useMemo(() => {
    const item = items.find((i) => i.id === product.id)
    return item?.quantity ?? 0;
  }, [items, product])
  return (
    <div>
      <div className={`relative rounded-xl h-52 md:h-72 ${productCount ? 'border-4 border-dark': ''}`}>
      <Image 
          src={`/assets/images/${product.image.desktop}.jpg`} 
          alt={product.name}  
          width={200}
          height={200} 
          sizes={imageSizes}
          object-fit="cover"  
          className="w-full h-full rounded-xl"
        />
        <div className="absolute -bottom-5 w-full flex justify-center">
          <AddToCart item={{ ...product, quantity: productCount }} />
        </div>
      </div>
      <div>
      <p className="text-sx text-light mt-8">{product.category}</p>
      <h2 className="text-lg font-bold text-body">{product.name}</h2>
      <p className="text-sm text-500 font-medium">${(product.price).toFixed(2)}</p>
      </div>
    </div>
  )
}