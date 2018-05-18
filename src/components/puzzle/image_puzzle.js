import React from "react";
import "../../css/puzzle.css";

const ImagePuzzle = ({ puzzle }) => {
  return (
    <div className="image-puzzle">
      <img id="puzzle-pic"
        alt={puzzle.name}
        src={`${window.PUBLIC_URL}/puzzles/${puzzle.path}.jpg`}
      />
    </div>
  );
};

export default ImagePuzzle;
