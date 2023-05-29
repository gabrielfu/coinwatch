'use client';

import React, { useState, useEffect } from 'react';

const ClientOnly = (props: React.PropsWithChildren) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
      setHasMounted(true);
  }, [])

  if (!hasMounted) return null;

  return (
    <>
      {props.children}
    </>
  );
};

export default ClientOnly;