import Stripe from 'stripe'
import { CartItem } from '@/constants/type'
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-03-31.basil' })

export async function POST(request: Request) {
  if (request.method === 'POST') {
    try {
      const { cartItems } = await request.json();

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: cartItems.map((item: CartItem) => ({
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.name,
              images: [item.image],
            },
            unit_amount: item.price,
          },
          quantity: item.quantity,
        })),
        success_url: `${request.headers.get('origin')}`,
        cancel_url: `${request.headers.get('origin')}`,
      })

      return NextResponse.json({
        isSuccess: true, 
        message: 'Payment Successful',
        url: session.url
      }, { status: 200 })
    } catch (err) {
      console.error(err)
      return NextResponse.json({
        message: (err as Error).message
      }, { status: 500 })
    }
  } else {
    return NextResponse.json({
      message: 'Method Not Allowed'
    }, { status: 405 })
  }
}