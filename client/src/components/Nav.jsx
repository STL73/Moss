import {headerLogo } from "../assets/icons/index";
import { FiMenu } from "../assets/icons/index";
import { navLinks } from "../constants/index";
const Nav = () => {
  return (
    <header className="padding-x py-8 absolute z-10 w-full">
      <nav className="flex justify-between items-center max-container">
        <a href="/" className="flex justify-center items-center gap-2 text-xl font-bold text-primary-green">
          <img src={headerLogo} alt="Moss Logo"
          className="w-16 h-16 object-contain rounded-full"
          />MossArt
        </a>
        <ul className="flex-1 flex justify-center items-center gap-16 max-lg:hidden">
            {navLinks.map((item) => (
                <li key={item.label}>
                    <a href={item.href} className="font-montserrat leading-normal text-lg text-text-accent">
                        {item.label}
                    </a>
                </li>
            ))}
        </ul>
        <div>
          <FiMenu className="w-6 h-6 text-moss-green cursor-pointer max-lg:block hidden" />
        </div>
      </nav>
    </header>
  );
};

export default Nav;
