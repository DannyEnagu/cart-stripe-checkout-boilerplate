'use client'
import { useRef } from 'react';
import { useCart } from '@/store/cart-store'
import Checkout from './Checkout'
import { Button } from 'primereact/button'
import { OverlayPanel } from 'primereact/overlaypanel'
import { Badge } from 'primereact/badge';
import { CartItem } from '@/constants/type';
import Image from 'next/image';

export default function Cart() {
  const overlayPanelRef = useRef<OverlayPanel>(null);
  const { items } = useCart()

  return (
    <div>
      {/* Mobile Cart */}
      <span className="lg:hidden">
        <Button
          aria-label="Cart"
          text
          className="text-primary"
          onClick={(e) => overlayPanelRef.current?.toggle(e)}
        >
          <i className="pi pi-shopping-cart p-overlay-badge" style={{ fontSize: '1.5rem' }}>
            <Badge value={items.length > 9 ? '9+' : String(items.length)} severity="danger"></Badge>
          </i>
        </Button>
      </span>
      <OverlayPanel
        ref={overlayPanelRef}
        showCloseIcon
        style={{ width: '95%', margin: '0 auto' }}
      >
        <CartItems items={items}/>
      </OverlayPanel>
      {/* Desktop Cart */}
      <div className="hidden lg:block bg-white rounded-md p-8">
        <CartItems items={items} />
      </div>
    </div>
  )
}

const CartItems = ({ items }: { items: CartItem[] }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  return (<div>
    <h1 className="text-2xl text-500 font-bold mb-4">Your Cart({items.length})</h1>
    {items.map((item) => <CardItem key={item.id} {...item} />)}
    {items.length > 0
      ? (<>
          <p className="my-4 text-body font-semibold flex items-center justify-between">
            <span>Total</span>
            <span className="text-3xl font-bold">${(total / 100).toFixed(2)}</span>
          </p>
          <p className="my-4 flex items-center gap-x-4 p-4 rounded-b-md text-body text-sm bg-light">
            <Image src="./assets/images/icon-carbon-neutral.svg" alt="Carbon neutral icon" width={20} height={20} />
            <span>This is a <strong>carbon-neutral </strong> delivery</span>
          </p>
          <Checkout />
        </>)
    : (<p className="text-center flex flex-col items-center justify-center">
      <Image src="./assets/images/illustration-empty-cart.svg" alt="Carbon neutral icon" width={150} height={150} />
      <span className="text-light mt-8">
        Your added items will appear hear
      </span>
    </p>)}
  </div>
  )
}

const CardItem = (item: CartItem) => {
  const { removeItem } = useCart()
  return (<div className="flex justify-between items-center py-3 border-b border-light">
    <div className="text-xs font-semibold">
      <p className="text-body text-sm font-semibold mb-2">{item.name}</p>
      <p className="flex items-center gap-x-3">
        <span className="text-500 text-sm">
          {item.quantity}x 
        </span>
        <span className="text-x-light">@ ${item.price}</span>
        <span className="text-light">${((item.price * item.quantity) / 100).toFixed(2)}</span>
      </p>
    </div>
    <Button icon="pi pi-times-circle" rounded text severity="danger" aria-label="Cancel" onClick={() => removeItem(item.id)} className="text-red-500 text-sm" />
  </div>)
}