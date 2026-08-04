import {products} from "../constants";
import PopularProductCard from "../components/PopularProductCard";
const PopularProducts = () => {
  return (
    <section id="products"
    className="max-container max-sm:mt-12">
      <div className="flex flex-col justify-start gap-5">
        <h2 className="text-4xl text-text-accent font-palanquin font-bold">Our 
          <span className="text-primary-green"> Popular</span> Products</h2>
        <p className="lg:max-w-lg mt-2 font-montserrat text-text-accent/80">Discover our curated selection of 
          popular moss decorations, 
          perfect for adding a touch of nature 
          to your space.</p>

      </div>
      <div className="mt-16 grid lg:grid-cols-4
      md:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-4 gap-14">
        {products.map((product) => (
          <PopularProductCard key={product.name} {...product} />
        ))}
      </div>
    </section>
  )
}

export default PopularProducts