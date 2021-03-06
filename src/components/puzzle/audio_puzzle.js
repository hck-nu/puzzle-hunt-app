import React from "react";
import "../../css/puzzle.css";

const AudioPuzzle = ({ puzzle }) => {
  const audiopath = `${window.PUBLIC_URL}/puzzles/${puzzle.path}`;
  const audiofiles = [
    "bank_account",
    "love_on_top",
    "no_limit",
    "like_a_g6",
    "bounce_back",
    "missed_calls"
  ];
  return (
    <div className="audio-puzzle">
      <p className="pb3 pt6">{puzzle.description}</p>
      {audiofiles.map((file, i) => {
        return (
          <audio id="audio-style" key={i} controls className="db">
            <source src={`${audiopath}/${file}.mp3`} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        );
      })}
    </div>
  );
};

export default AudioPuzzle;
