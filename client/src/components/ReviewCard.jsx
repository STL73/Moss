import { FaStar } from "../assets/icons"

const ReviewCard = ({imgURL, customerName, rating, feedback}) => {
  return (
    <div className="flex justify-center items-center flex-col">
        <img 
        src={imgURL} 
        alt="customer" 
        className="rounded-full w-30 h-30 object-cover" />
        <p className="mt-6 text-center max-w-sm info-text">{feedback}</p>
        <div className="mt-3 flex justify-center items-center gap-3">
            <FaStar 
            width={24}
            hanging={24}
            className="text-moss-green m-0 font-montserrat
            text-xl"/>
            <p className="font-montserrat text-xl text-text-accent/80">({rating})</p>
        </div>
        <h3 className="mt-1 font-palanquin text-3xl text-center font-bold text-text-accent">{customerName}</h3>
    </div>
  )
}

export default ReviewCard