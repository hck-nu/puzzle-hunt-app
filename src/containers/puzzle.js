import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getPuzzle } from "../modules/puzzle";
import PuzzlePage from "../components/puzzle";

class PuzzleContainer extends Component {
  render() {
    return <PuzzlePage {...this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    puzzle: state.puzzle.puzzle
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getPuzzle
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PuzzleContainer);
