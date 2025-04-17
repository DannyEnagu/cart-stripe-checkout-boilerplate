import { v4 as uuidv4 } from 'uuid';
import ProductCard from "@/components/ProductCard";
import products  from '@/constants/products.json';
import Header from '@/components/Header';
import Cart from '@/components/Cart';

export default function Home() {
  const productsWithIds = products.map(product => ({...product, id: uuidv4()}))

  return (
    <div className="flex gap-x-8 container mx-auto mt-8">
      <main className='flex-1'>
        <Header />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
          {productsWithIds.map((product) => (
            <ProductCard
            key={product.id}
            product={product}
            />
          ))}
        </div>
       {/* Desktop Only cart */}
      </main>
       <aside className="hidden lg:block">
        <Cart />
       </aside>
    </div>
  );
}
