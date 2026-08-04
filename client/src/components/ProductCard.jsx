const ProductCard = ({ imgURL, changeBigProductImage, bigProductImg }) => {
  const handleClick = () => {
    if (bigProductImg !== imgURL.bigProduct) {
      changeBigProductImage(imgURL);
    }
  };
  return (
    <div
      className={`border-2 rounded-xl ${bigProductImg === imgURL.bigProduct ? "border-primary-green" : "border-transparent"}
        cursor-pointer max-sm:flex-1`}
      onClick={handleClick}
    >
      <div
        className="flex
        justify-center items-center bg-bg-color
         bg-center bg-cover sm:w-36
        sm:h-36 rounded-xl max-sm:p-4"
      >
        <img
          src={imgURL.thumbnail}
          alt="product thumbnail"
          // width={80}
          // height={80}
          className=" w-30 h-30 object-cover rounded-xl"
        />
      </div>
    </div>
  );
};

export default ProductCard;
