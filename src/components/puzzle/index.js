import React, { Component } from "react";
import Button from "../common/button";
import Input from "../common/input";
import NotFound from "../not_found";

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
      <div id="puzzle">
        <div id="content">
          <div id="puzzle-name">{puzzle.name}</div>
          {puzzle.description && (
            <div id="puzzle-description">{puzzle.description}</div>
          )}
          {puzzle.puzzle_type === "image" && (
            <img alt={puzzle.name} src={puzzlePath} />
          )}
        </div>
        <div id="user-input">
          <Input
            className="answer-input"
            placeholder="Your answer"
            value={this.state.answer}
            onChange={e => this.onAnswerInputChange(e.target.value)}
          />
          <Button
            className="submit-button"
            backgroundColor="bg-pink"
            onClick={() => this.onSubmitAnswer()}
          >
            Submit answer
          </Button>
        </div>
        <div id="hints">
          <Button backgroundColor="bg-bronze">Bronze hint</Button>
          <Button backgroundColor="bg-silver">Silver hint</Button>
          <Button backgroundColor="bg-gold">Gold hint</Button>
          <label>
            Your team incur's a point deduction by accessing hints. Gold (-30
            points), Silver (-20 points), Bronze (-10 points)
          </label>
        </div>
      </div>
    );
  }
}
