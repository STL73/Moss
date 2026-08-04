const ServiceCard = ({ imgURL: Icon, label, subtext }) => {
  return (
    <div className="flex-1 sm:w-87.5 
    sm:min-w-87.5 rounded-[20px] w-full
    px-10 py-16 shadow-3xl">
      <div className="w-11 h-11 flex justify-center items-center bg-primary-green rounded-full">
        <Icon size={24} color="white" alt={label} />
      </div>
      <h3 className="mt-5 font-palanquin text-3xl leading-normal font-bold text-text-accent">{label}</h3>
      <p className="mt-3 wrap-break-word font-montserrat text-lg leading-normal text-text-accent/80">{subtext}</p>
    </div>
  )
}

export default ServiceCard