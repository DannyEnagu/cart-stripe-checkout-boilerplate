import { v4 as uuidv4 } from 'uuid';
import ProductCard from "@/components/ProductCard";
import products  from '@/constants/products.json';
import Header from '@/components/Header';
import Cart from '@/components/Cart';

export default function Home() {
  const productsWithIds = products.map(product => ({...product, id: uuidv4()}))

  return (
    <div className="flex gap-x-8 container mx-auto my-8">
      <main className='flex-1 px-4'>
        <Header />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8 mt-4">
          {productsWithIds.map((product) => (
            <ProductCard
            key={product.id}
            product={product}
            />
          ))}
        </div>
       {/* Desktop Only Cart */}
      </main>
       <aside className="hidden lg:block">
        <Cart />
       </aside>
    </div>
  );
}
