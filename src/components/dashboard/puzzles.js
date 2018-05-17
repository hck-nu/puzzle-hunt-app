import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Puzzles extends Component {
  markComplete(puzzleId) {
    if (this.props.team && this.props.team.Puzzles) {
      return (
        this.props.team.Puzzles.map(p => {
          return p.id;
        }).indexOf(puzzleId) > -1
      );
    }
  }

  renderPuzzles() {
    if (!this.props.puzzles) return null;

    return this.props.puzzles.map((puzzle, i) => {
      return (
        <Link
          key={i}
          className="puzzle-item pa2 w-100"
          to={`/puzzle/${puzzle.id}`}
        >
          <span className="puzzle-number">#{i}</span>
          <h3 className="puzzle-name ma0">{puzzle.name}</h3>
          <p className="puzzle-description">{puzzle.description}</p>
          <p className="puzzle-is-complete">
            {this.markComplete(puzzle.id) ? "Completed" : ""}
          </p>
        </Link>
      );
    });
  }
  render() {
    return (
      <div id="puzzle-list" className="pt6 w-100">
        {this.props.team && this.props.puzzles ? (
          <div id="puzzles">
            <h1 className="ma0 pb2">Puzzle list</h1>
            <p className="lh-copy">
              {this.props.team.name} has completed{" "}
              {this.props.team.Puzzles.length} of {this.props.puzzles.length}{" "}
              puzzles{" "}
            </p>
            <div>{this.renderPuzzles()}</div>
          </div>
        ) : (
          <div>
            <h1 className="ma0 pb2">
              You must join a team to view these puzzles
            </h1>
          </div>
        )}
      </div>
    );
  }
}
