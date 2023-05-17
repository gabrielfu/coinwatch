'use client';

import Link from "next/link";
import Image from "next/image";

const Logo = () => {
  return (
    <Link href='/' className='flex gap-2 justify-center items-center'>
      <Image
        src='/images/logo-transparent-white.png'
        alt='logo'
        width={224}
        height={32}
        className='object-contain'
      />
    </Link>
  )
}

export default Logo;