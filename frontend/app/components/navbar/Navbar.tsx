"use client";

import NavLink from "./NavLink";
import Logo from "./Logo";

const Navbar = () => {
  return (
    <nav className='flex sticky top-0 z-10 bg-gmx-dark justify-between items-center w-full mb-8 pt-3'>
      <Logo />

      {/* Desktop Navigation */}
      <div className='sm:flex hidden'>
          <div className='flex gap-3 md:gap-5'>
            <NavLink href="/tokens">
              Tokens
            </NavLink>
            <NavLink href="/portfolios">
              Portfolios
            </NavLink>
          </div>
      </div>
    </nav>
  );
};

export default Navbar;