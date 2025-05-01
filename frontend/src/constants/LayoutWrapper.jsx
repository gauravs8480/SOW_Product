import React from 'react';

const LayoutWrapper = ({ children }) => {
  return (
    <div className=" px-5 md:px-16 lg:px-30 xl:px-45 3xl:px-62 4xl:px-100      w-full">
      {children}
    </div>
  );
};

export default LayoutWrapper;




// mobile-s:bg-green-500
// mobile-m:bg-gray-600
// mobile-l:bg-amber-600
// md:bg-green-500
// 2xl:bg-pink-500 lg:bg-red-500
// xl:bg-blue-500 