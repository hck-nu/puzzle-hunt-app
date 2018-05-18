import React from "react";

const ImagePuzzle = ({ puzzle }) => {
  return (
    <div className="image-puzzle">
      <img
        alt={puzzle.name}
        src={`${window.PUBLIC_URL}/puzzles/${puzzle.path}.jpg`}
      />
    </div>
  );
};

export default ImagePuzzle;
