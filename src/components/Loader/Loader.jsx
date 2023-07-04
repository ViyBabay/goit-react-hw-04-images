import React from 'react';
import { InfinitySpin } from 'react-loader-spinner';

export function Loader() {
  return (
    <div>
      <InfinitySpin
        height="60"
        width="60"
        radius="9"
        color="green"
        ariaLabel="three-dots-loading"
        wrapperStyle
        wrapperClass
      />
    </div>
  );
}
