
type ProductImage = {
  thumbnail: string;
  mobile: string;
  tablet: string;
  desktop: string
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: ProductImage;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}