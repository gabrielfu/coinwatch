'use client';

import React from 'react';

const Container = (props: React.PropsWithChildren) => {
  return ( 
      <div 
        className="
          max-w-[2520px] 
          mx-auto 
          xl:px-20 
          md:px-10 
          sm:px-10 
          px-4
        "
      >
        {props.children}
      </div>
   );
}
  
export default Container;