import { Product } from "@/constants/type"
import { useCart } from "@/store/cart-store"
import Image from "next/image"
import { Button } from "primereact/button"

interface CartItem extends Product {
  quantity: number;
}


export const AddToCart = ({ item }: { item: CartItem }) => {
  const { addItem, decreaseQuantity, removeItem } = useCart();
  // const [productCount, setProductCount] = useState(0)

  const increaseItem = () => {
    addItem(item)
  };

  const decreaseItem = () => {
    if (item.quantity === 1) {
      removeItem(item.id)
      return;
    }
    decreaseQuantity(item.id)
  };

  const addProductToCart = () => {
    addItem(item)
  };

  if (item.quantity) {
    return (<div className="bg-500 rounded-full flex items-center justify-between w-[150px] p-2">
      <Button
        outlined
        rounded
        className="!text-xs !text-white !size-5 !font-bold !p-1"
        onClick={() => decreaseItem()}
        icon="pi pi-minus"
      />
      <span className="text-white font-bold">
        {item.quantity}
      </span>
      <Button
        outlined
        rounded
        className="!text-xs !text-white !size-5 !font-bold !p-1"
        onClick={() => increaseItem()}
        icon="pi pi-plus"
      />
    </div>
    )
  }

  return (
    <Button
    severity="secondary"
    rounded
    outlined
    className="!text-sm !bg-white text-primary !font-bold !py-2"
    onClick={() => addProductToCart()}
    >
    <Image src="./assets/images/icon-add-to-cart.svg" alt="Add to cart icon" width={20} height={20} />
    <span className="ml-2">Add to Cart</span>
    </Button>
  )
}