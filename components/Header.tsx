import Cart from "./Cart"

function Header() {
  return (
    <header className="flex items-center justify-between">
       <h1 className="text-2xl md:text-3xl font-bold">
         Desserts
       </h1>
       <div className="lg:hidden">
        <Cart />
       </div>
    </header>
  )
}

export default Header