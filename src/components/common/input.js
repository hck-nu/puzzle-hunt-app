import React from "react";

const FormInput = ({
  className,
  value = "",
  type = "text",
  placeholder = "",
  onChange,
  highlight,
  memo = ""
}) => (
  <div className={`text-input ${className || ""}`}>
    <input
      className={`karla pa2 input-reset br2 ba w-100
                ${highlight ? "highlighted" : ""}
            `}
      type={type}
      placeholder={placeholder}
      value={value || ""}
      onChange={onChange}
    />
    {memo && <div className="memo karla white f6 antialias mt1">{memo}</div>}
  </div>
);

export default FormInput;
