'use client';

import Link from "next/link";
import Image from "next/image";

const SmallLogo = () => {
  return (
    <Link href='/' className='items-center'>
      <Image
        src='/images/favicon-transparent-white.svg'
        alt='logo'
        width={50}
        height={50}
        className='object-contain'
      />
    </Link>
  )
}

export default SmallLogo;