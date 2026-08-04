import {FaStar} from "../assets/icons";

const PopularProductCard = ({ imgURL, name, price }) => {
  return (
    <div className="flex flex-1 flex-col w-full max-sm:w-full">
      <img src={imgURL} alt={name} className="w-70 h-70 rounded-2xl" />
      <div className="mt-8 flex justify-start items-center gap-2.5">
        <FaStar width={24} height={24} className="text-primary-green" />
        <p className="font-montserrat text-xl 
        leading-normal text-text-accent/80">(4.5)</p>
      </div>
      <h3 className="mt-2 text-2xl leading-normal
      font-semibold font-palanquin text-text-accent">{name}</h3>
      <p className="mt-2 text-2xl leading-normal
      font-semibold font-montserrat text-primary-green">{price}</p>
    </div>
  );
};

export default PopularProductCard;
