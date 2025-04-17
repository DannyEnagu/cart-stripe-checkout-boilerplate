import { useCart } from "@/store/cart-store"
import { Button } from "primereact/button"

export default function Checkout() {
  const { items } = useCart()

  const handleCheckout = async () => {
    try {
      const res = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartItems: items }),
      })
      const data = await res.json()
      console.log(data, 'Payment data')
      if (data?.isSuccess) {
        window.location.href = data.url
      }
    } catch (error) {
      console.log(error, 'Error Confirming payment')
    }
  }

  return (
    <div>
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