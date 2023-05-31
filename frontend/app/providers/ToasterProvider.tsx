'use client';

import { Toaster } from "react-hot-toast";
import { twColors } from "../twConfig";

const ToasterProvider = () => {
  return ( 
    <Toaster 
      toastOptions={{
        style: {
          backgroundColor: twColors.highlight,
          color: twColors.white,
        },
        iconTheme: {
          primary: twColors.primary,
          secondary: twColors.white,
        },
      }}
    />
   );
}
 
export default ToasterProvider;
