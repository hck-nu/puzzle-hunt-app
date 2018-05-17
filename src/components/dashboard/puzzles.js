import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Puzzles extends Component {
  renderPuzzles() {
    if (!this.props.puzzles) return null;

    return this.props.puzzles.map((puzzle, i) => {
      return (
        <Link key={i} to={`/puzzle/${puzzle.id}`}>
          <h3 className="ma0">{puzzle.name}</h3>
          <p>{puzzle.description}</p>
        </Link>
      );
    });
  }
  render() {
    return <div id="puzzle-list">{this.renderPuzzles()}</div>;
  }
}
