import React, { Component } from "react";
import Button from "../common/button";
import Input from "../common/input";
import NotFound from "../not_found";
import "../../css/puzzle.css";

export default class PuzzlePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: ""
    };
  }

  componentWillMount() {
    this.props.getPuzzle(this.props.id);
  }

  onAnswerInputChange(answer) {
    this.setState({
      answer
    });
  }

  onSubmitAnswer = async () => {
    const answer = this.state.answer;
    await this.props.verifyAndCompletePuzzle(this.props.id, answer);
  };

  render() {
    const { puzzle } = this.props;

    if (!puzzle) {
      return <NotFound />;
    }

    const puzzlePath = `${window.PUBLIC_URL}/puzzles/${puzzle.path}.jpg`;

    return (
      <div id="puzzle" className="bg-white">
        <section id="content" className="h-100 bg-white dib fl">
          {puzzle.description && (
            <div id="puzzle-description">{puzzle.description}</div>
          )}
          {puzzle.puzzle_type === "image" && (
            <img alt={puzzle.name} src={puzzlePath} />
          )}
        </section>
        <section id="sidebar" className="h-100 bg-light-gray pa3 dib fl">
          <div className="input-container">
            <div id="user-input">
              <Input
                className="answer-input"
                placeholder="Your answer"
                value={this.state.answer}
                onChange={e => this.onAnswerInputChange(e.target.value)}
              />

              <Button
                id="answer"
                className="submit-button"
                backgroundColor="bg-pink"
                onClick={() => this.onSubmitAnswer()}
              >
                Submit
              </Button>
            </div>

            <div id="hints">
              <Button backgroundColor="bg-bronze">Bronze hint</Button>
              <Button backgroundColor="bg-silver">Silver hint</Button>
              <Button backgroundColor="bg-gold">Gold hint</Button>
            </div>

            <label className="f6">
              Your team incur's a point deduction by accessing hints. Bronze
              (-10 points), Silver (-20 points), Gold (-30 points)
            </label>
          </div>
        </section>
      </div>
    );
  }
}
