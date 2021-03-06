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
      let isComplete = this.markComplete(puzzle.id);
      return (
        <Link
          key={i}
          className={`puzzle-item pa3 w-100 mb3 ${isComplete && "completed"}`}
          to={`/puzzle/${puzzle.id}`}
        >
          <span className="puzzle-number mr3">#{i}</span>
          <h3 className="puzzle-name ma0 dib">{puzzle.name}</h3>
          <p className="puzzle-is-complete dib ttu ma0 small fr gold">
            {isComplete ? "Completed" : ""}
          </p>
          {puzzle.description && (
            <p className="puzzle-description">{puzzle.description}</p>
          )}
        </Link>
      );
    });
  }
  render() {
    return (
      <div id="puzzle-list" className="pt6 w-100 pl2 pr2">
        {this.props.team &&
        this.props.player &&
        this.props.player.team_id &&
        this.props.puzzles ? (
          <div id="puzzles">
            <h1 className="ma0 pb2">Puzzle list</h1>
            <p className="lh-copy">
              You must complete the following puzzles to finish the puzzle hunt.
              Your team, {this.props.team.name}, has completed{" "}
              {this.props.team.Puzzles.length} of {this.props.puzzles.length}{" "}
              puzzles.
            </p>
            <div>{this.renderPuzzles()}</div>
          </div>
        ) : (
          <div className="tc">
            <h1 className="ma0 pb2 pt3">
              Sorry, you must join a team to view these puzzles!
            </h1>
            <p className="f3">
              <a
                className="tabbed-link lh-copy"
                onClick={e => this.props.changeTab(1)}
              >
                Join a team
              </a>
            </p>
          </div>
        )}
      </div>
    );
  }
}
