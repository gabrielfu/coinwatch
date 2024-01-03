import Image from "next/image";

const TokenLogo = ({src, alt, size}: {src: string, alt: string, size: number}) => {
  return ( 
    <Image 
      alt={alt}
      className="shadow-md rounded-3xl"
      height={size}
      width={size}
      src={src}
    />
   );
}
 
export default TokenLogo;