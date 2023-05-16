import React from "react";
import { usePathname } from "next/navigation";
import Link, { LinkProps } from "next/link";

const NavLink = (props: React.PropsWithChildren<LinkProps>) => {
  const pathname = usePathname();
  const isActive = pathname.startsWith(props.href.toString());
  const className = "text-gmx-text text-lg font-medium px-4 py-2 " 
    + (isActive ? "rounded-2xl bg-gmx-light text-white" : "hover:text-white hover:underline hover:underline-offset-8");

  return (
    <div className={className}>
      <Link {...props} />
    </div>
  );
};

export default NavLink;
