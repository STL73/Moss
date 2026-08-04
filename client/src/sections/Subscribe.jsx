import Button from "../components/Button"

const Subscribe = () => {
  return (
    <section id="contact-us" className="max-container flex justify-between 
    items-center max-lg:flex-col gap-10">
      <h3 className="text-4xl leading-17 lg:max-w-md
      font-palanquin font-bold text-text-accent">Sign Up for 
        <span className="text-primary-green"> New Updates </span> 
        and Our Newsletter
      </h3>
      <div className="lg:max-w-[40%] w-full flex 
      items-center max-sm:flex-col gap-5
      p-2.5 sm:border border-text-accent/50 rounded-full">
        <input type="text" 
        placeholder="subscribe@mossart.com"
        className="input"/> 
        <div className="flex max-sm:justify-end items-center max-sm:w-full">
          <Button label="Sign Up"
          fullWidth/>
        </div>
      </div>

    </section>
  )
}

export default Subscribe