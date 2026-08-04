import { FaArrowRight } from "../assets/icons"
import Button from "../components/Button"
import { offer } from "../constants/index"
const MossWorld = () => {
  return (
    <section className="flex justify-between items-center
    max-xl:flex-col-reverse gap-16 max-container">
      <div className="grid grid-cols-2 gap-5 flex-1 bg-bg-green
      p-8 rounded-2xl">
        {offer.map((item, index) => (
          <img 
            key={item}
            src={item.src}
            alt={item.alt}
            // width={773}
            // height={687}
            className={`w-full h-60 object-cover rounded-2xl ${
              index === 2 ? 'col-span-2 object-center' : ''
            }`}
          />
        ))}
      </div>
      <div className="flex flex-1 flex-col">
        <h2
          className="font-palanquin text-4xl capitalize
       *: font-bold lg:max-w-lg text-text-accent"
        >
          Explore the amazing <span className="text-primary-green inline-block mt-3"> Moss</span> World 
        </h2>
        <p className="mt-4 lg:max-w-lg info-text">
          Step into a world where nature meets artistry. Our moss collection celebrates the intricate beauty of this ancient plant, sustainably harvested and thoughtfully arranged into stunning decorative pieces. Perfect for modern homes, offices, or gift-giving, each item tells a unique story of nature's quiet elegance.
        </p>
        <p className="mt-6 lg:max-w-lg info-text">
          Moss isn't just beautiful—it's a living symbol of harmony and sustainability. By bringing moss into your space, you're choosing eco-friendly décor that purifies the air and creates a peaceful ambiance. Join thousands of moss lovers who have transformed their surroundings with our premium, handmade collections.
        </p>
        <div className="mt-11">
          <Button label="Learn More" iconURL={FaArrowRight}/>
          </div>
      </div>
    </section>
  )
}

export default MossWorld