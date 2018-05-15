import React from "react";

const FormInput = ({
  className,
  value = "",
  type = "text",
  placeholder = "",
  onChange,
  highlight
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
  </div>
);

export default FormInput;
