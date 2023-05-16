import Image from "next/image";

const TokenLogo = ({src, alt, size}) => {
  return ( 
    <Image 
      alt={alt}
      className="sm:w-6 sm:h-6 shadow-md rounded-3xl"
      height={size}
      width={size}
      src={src}
    />
   );
}
 
export default TokenLogo;