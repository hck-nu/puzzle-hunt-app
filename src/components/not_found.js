import React from "react";

var divStyling = {
  backgroundColor: "#07024f",
  height: "100vw",
  width: "100vw"
};

var textStyling = {
  color: "gold",
  display: "block",
  padding: "20vw",
  fontSize: "7vw",
  textAlign: "center"
};

const NotFound = props => (
  <div style={divStyling}>
    <h1 style={textStyling} className="error karla gray f6 antialias mt1">
      404: Not Found :(
    </h1>
  </div>
);

export default NotFound;
