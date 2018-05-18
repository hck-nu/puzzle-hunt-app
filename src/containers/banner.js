import React from "react";

const Banner = ({ children, className, isShown, color }) => (
  <div
    className={`mw6 ph4 pv3 karla br2 f4 navy antialias left-0 right-0 center fixed top-2 z-max bg-${color} animated  
            ${isShown ? " slide-down " : " slide-up "}
            ${className}
        `}
  >
    {children}
  </div>
);

export default Banner;
