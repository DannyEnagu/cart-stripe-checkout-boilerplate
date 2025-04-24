'use client';
import { Toast } from 'primereact/toast';
import { useCart } from "@/store/cart-store";
import { Button } from "primereact/button";
import { useRef } from 'react';

export default function Checkout() {
  const toast = useRef<Toast>(null);
  const { items } = useCart();

  const showToast = (severity: 'success' | 'error' , detail: string ) => {
    toast.current?.show({
      severity,
      summary: severity === 'success' ? 'Success' : 'Error',
      detail,
      life: 5000
    });
}

  const handleCheckout = async () => {
    try {
      const res = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartItems: items }),
      });
      const data = await res.json();
      if (data?.isSuccess) {
        showToast('success', data.message)
        window.location.href = data.url;
        return
      }
      showToast('error', data.message)
    } catch (error) {
      console.error(error, 'Error Confirming payment');
    }
  };

  return (
    <div>
      <Toast ref={toast} />
      <h1 className="text-body font-semibold mb-4">Confirm Your Order</h1>
      <Button
        label="Pay with Stripe"
        severity="success"
        className="w-full"
        rounded
        onClick={handleCheckout}
      />
    </div>
  )
}