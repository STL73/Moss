import { moss1 } from "../assets/images"
import Button from "../components/Button"
const HandMade = () => {
  return (
    <section id="about-us"
    className="flex justify-between 
    items-center max-lg:flex-col
    gap-16 w-full max-container">
      <div className="flex flex-1 flex-col">
        <h2
          className="font-palanquin text-4xl text-text-accent capitalize
       *: font-bold lg:max-w-lg"
        >
          Handmade <span className="text-primary-green inline-block mt-3"> Moss</span> Decorations Made with <span className="text-primary-green inline-block mt-3"> Love and Passion</span>
        </h2>
        <p className="mt-4 lg:max-w-lg info-text">
          At MossArt, we take pride in our handcrafted moss decorations, 
          meticulously created by skilled artisans who share a deep passion 
          for nature and design. Each piece is thoughtfully assembled using 
          high-quality materials to ensure durability and aesthetic appeal. 
        </p>
        <p className="mt-6 lg:max-w-lg info-text">Our artisans pour their heart into every creation, resulting in unique 
          decorations that bring a touch of greenery and tranquility to your living space. 
          Experience the beauty of handmade craftsmanship with MossArt's exquisite moss decorations.
        </p>
        <div className="mt-11">
          <Button label="View Details" />
          </div>
      </div>
      <div className="flex-1 flex justify-center items-center bg-bg-green p-8 rounded-2xl">
        <img src={moss1} alt="moss"
        // width={580}
        // height={522} 
        className=" w-full h-120 object-cover rounded-2xl"/>
      </div>

    </section>
  )
}

export default HandMade