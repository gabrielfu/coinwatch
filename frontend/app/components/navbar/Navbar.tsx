"use client";

import NavLink from "./NavLink";
import Logo from "./Logo";
import SmallLogo from "./SmallLogo";

const Navbar = () => {
  return (
    <nav className='flex sticky top-0 z-10 bg-backdrop justify-between items-center w-full mb-8 pt-3'>
      <div className='sm:flex hidden'>
        <Logo />
      </div>
      <div className="sm:hidden block">
        <SmallLogo />
      </div>

      <div className='flex gap-3 md:gap-5'>
        <NavLink href="/tokens">
          Tokens
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;