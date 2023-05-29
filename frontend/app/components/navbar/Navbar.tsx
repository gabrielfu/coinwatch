"use client";

import NavLink from "./NavLink";
import Logo from "./Logo";
import SmallLogo from "./SmallLogo";
import { BiMenu, BiArrowToRight } from "react-icons/bi";
import { useState } from "react";

const Navbar = () => {
  const [toggleDropDown, setToggleDropdown] = useState(false);

  return (
    <nav className='flex sticky top-0 z-10 bg-gmx-dark justify-between items-center w-full mb-8 pt-3'>
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
        <NavLink href="/portfolios">
          Portfolios
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;