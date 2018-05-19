import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  getPuzzle,
  verifyAndCompletePuzzle,
  accessHint,
  getAccessedHints
} from "../modules/puzzle";
import PuzzlePage from "../components/puzzle";

class PuzzleContainer extends Component {
  render() {
    return <PuzzlePage {...this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    puzzle: state.puzzle.puzzle,
    accessed_hints: state.puzzle.accessed_hints,
    requestingPuzzle: state.puzzle.requestingPuzzle,
    puzzles: state.puzzle.puzzles
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getPuzzle,
      verifyAndCompletePuzzle,
      accessHint,
      getAccessedHints
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PuzzleContainer);
