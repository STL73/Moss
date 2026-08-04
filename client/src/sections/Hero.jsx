import { FaArrowRight } from "../assets/icons";
import { useState } from "react";
import Button from "../components/Button";
import { statistics, thumbnails } from "../constants";
import { product1 } from "../assets/images";
import ProductCard from "../components/ProductCard";

const Hero = () => {
  const [bigProductImg, setBigProductImg] = useState(product1);
  return (
    <section
      id="home"
      className="flex xl:flex-row flex-col justify-center min-h-screen gap-10 max-container"
    >
      <div className="relative xl:w-2/5 flex flex-col justify-center items-start w-full max-xl:p-16 pt-28">
        <p className="text-xl font-montserrat text-text-accent">
          Our latest products
        </p>
        <h1
          className="mt-10 font-palanquin text-text-accent text-8xl
        max-sm:text-[72px] max-sm:leading-[82] font-bold"
        >
          <span
            className="xl:bg-white
          xl:whitespace-nowrap relative z-10 pr-10"
          >
            The New Collection
          </span>
          <br />
          <span className="text-primary-green inline-block mt-3">Moss</span> Art
        </h1>
        <p
          className="font-montserrat text-text-accent/80
        text-lg leading-8 mt-6 mb-14 sm:max-w-sm"
        >
          Discover the beauty of nature through our exclusive collection.
        </p>
        <Button label="Shop Now" iconURL={FaArrowRight} />
        <div className="flex justify-center items-start flex-wrap w-full mt-20 gap-16">
          {statistics.map((stat) => (
            <div key={stat.label}>
              <p
                className="text-4xl
              font-palanquin font-bold text-text-accent"
              >
                {stat.value}
              </p>
              <p className="leading-7 font-montserrat text-text-accent/80">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div
        className="relative flex-1 
      flex justify-end items-center
      xl:min-h-screen max-xl:py-40 bg-bg-green max-xl:justify-center"
      >
        <img
          src={bigProductImg}
          alt="products collection"
          // width={350}
          // height={140}
          className="w-100 h-120 object-cover rounded-xl relative z-10 mr-12 mb-8"
        />
        <div className="flex sm:gap-6 gap-4 absolute -bottom-[5%] sm:left-[10%] max-sm:px-6 ">
          {thumbnails.map((item) => (
            <div key={item.thumbnail}>
              <ProductCard
                imgURL={item}
                changeBigProductImage={(item) =>
                  setBigProductImg(item.bigProduct)
                }
                bigProductImg={bigProductImg}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
