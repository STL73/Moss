import { FaRegCopyright, headerLogo } from "../assets/icons"
import { footerLinks, socialMedia } from "../constants"

const Footer = () => {
  return (
    <footer className="max-container">
      <div className="flex justify-between items-start flex-wrap
        gap-20 max-lg:flex-col">
        <div className="flex flex-col items-start">
          <a href="/" className="flex justify-center items-center 
            gap-2 text-xl font-bold text-pale-green">
            <img src={headerLogo} alt="Moss Logo"
            className="w-16 h-16 object-contain rounded-full"
            />MossArt
          </a>
          <p className="mt-6 text-base leading-7
            font-montserrat text-pale-green sm:max-w-sm">
            MossArt is your go-to destination for exquisite handmade art pieces 
            that bring nature's beauty into your home.
          </p>
          <div className="flex items-center gap-5 mt-8">
            {socialMedia.map((icon) => (
              <div className="flex justify-center
                items-center w-12 h-12 bg-pale-green rounded-full">
                <icon.src src={icon.src} alt={icon.alt} 
                className="w-6 h-6 text-text-accent"/>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-1 justify-between 
          lg:gap-10 gap-20 flex-wrap ">
            {footerLinks.map((section) => (
              <div key={section}>
                <h4 className="text-pale-green font-montserrat
                  text-2xl leading-normal font-medium mb-6">{section.title}</h4>
                <ul>
                  {section.links.map((link) => (
                    <li className="mt-3 text-slate-400 font-montserrat
                    text-base leading-normal hover:text-pale-green cursor-pointer"
                    key={link.name}>
                      <a>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      </div>
      <div className="flex justify-between
      text-pale-green mt-24 
        max-sm:flex-col max-sm:items-center">
          <div className="flex flex-1 
          justify-start items-center gap-2
          font-montserrat cursor-pointer">
            <FaRegCopyright alt="copy right symbol" 
            className="w-5 h-5 rounded-full m-0"/>
            <p>Copyright | 2024 MossArt | All rights reserved.</p>
          </div>
          <p className="font-montserrat cursor-pointer">
            Terms and Conditions
          </p>
      </div>
    </footer>
  )
}

export default Footer