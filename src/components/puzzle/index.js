import React, { Component } from "react";
import crypto from "crypto";
import config from "../../config";
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
    this.setState({ answer });
  }

  onSubmitAnswer = async () => {
    const answer = this.state.answer;
    this.setState({ answer: "" });
    await this.props.verifyAndCompletePuzzle(this.props.id, answer);
  };

  accessHint(encrypted) {
    const key = config.DECRYPTION_KEY;
    let decipher = crypto.createDecipher("aes-256-ctr", key);
    let dec = decipher.update(encrypted, "hex", "utf8");
    dec += decipher.final("utf8");
    console.log(dec);
  }

  renderHints() {
    if (this.props.puzzle && this.props.puzzle.Hints) {
      return this.props.puzzle.Hints.map((hint, i) => {
        const hintType =
          hint.type.charAt(0).toUpperCase() + hint.type.substr(1);
        return (
          <div key={i}>
            <Button
              backgroundColor={`bg-${hint.type}`}
              onClick={e => this.accessHint(hint.description)}
            >
              {hintType} Hint
            </Button>
          </div>
        );
      });
    }
  }

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
            <form
              onSubmit={e => {
                e.preventDefault();
                this.onSubmitAnswer();
              }}
            >
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
                  type="submit"
                >
                  Submit
                </Button>
              </div>
            </form>

            <div id="hints">{this.renderHints()}</div>
            <label className="f6">
              Your team incur's a point deduction by accessing hints. Bronze
              (+10 minutes), Silver (+20 minutes), Gold (+30 minutes)
            </label>
          </div>
        </section>
      </div>
    );
  }
}
