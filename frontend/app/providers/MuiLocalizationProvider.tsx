'use client';

import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const MuiLocalizationProvider = (props: React.PropsWithChildren) => {
  return ( 
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {props.children}
    </LocalizationProvider>
   );
}
 
export default MuiLocalizationProvider;