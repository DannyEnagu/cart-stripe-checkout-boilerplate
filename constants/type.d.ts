
type ProductImage = {
  thumbnail: string,
  mobile: string,
  tablet: string,
  desktop: string
}

export interface Product {
  id: string
  name: string
  price: number
  image: ProductImage
}

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: ProductImage
}