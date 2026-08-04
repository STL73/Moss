const Button = ({ label, iconURL, fullWidth }) => {
  const Icon = iconURL;
  return (
    <button className="flex justify-center items-center
    gap-2 px-7 py-4 border font-montserrat text-lg leading-none bg-primary-green rounded-full text-white ${fullWidth && 'w-full'}">
        {label}
        {Icon && <Icon className="ml-2 w-5 h-5" />}
    </button>
    

  )
}

export default Button