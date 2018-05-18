import React, { Component } from "react";
import crypto from "crypto";
import config from "../../config";
import Button from "../common/button";
import Input from "../common/input";
import NotFound from "../not_found";
import AudioPuzzle from "./audio_puzzle";
import ImagePuzzle from "./image_puzzle";
import "../../css/puzzle.css";
import { Link } from "react-router-dom";

export default class PuzzlePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: ""
    };
  }

  componentWillMount() {
    this.props.getPuzzle(this.props.id);
    this.props.getAccessedHints(this.props.id);
  }

  onAnswerInputChange(answer) {
    this.setState({ answer });
  }

  onSubmitAnswer = async () => {
    const answer = this.state.answer;
    this.setState({ answer: "" });
    await this.props.verifyAndCompletePuzzle(this.props.id, answer);
  };

  decryptHint = hint => {
    const key = config.DECRYPTION_KEY;
    let decipher = crypto.createDecipher("aes-256-ctr", key);
    let dec = decipher.update(hint.description, "hex", "utf8");
    dec += decipher.final("utf8");
    return dec;
  };

  accessHint = async hint => {
    await this.props.accessHint(this.props.puzzle.id, hint.id);
  };

  renderHints() {
    if (this.props.puzzle && this.props.puzzle.Hints) {
      const accessedHints = this.props.accessed_hints || [];
      return this.props.puzzle.Hints.map((hint, i) => {
        const hintType =
          hint.type.charAt(0).toUpperCase() + hint.type.substr(1);
        const accessedBefore =
          accessedHints.findIndex(el => {
            return el.id === hint.id;
          }) > -1;
        return (
          <div className="hint-item" key={i}>
            {accessedBefore ? (
              <div>{this.decryptHint(hint)}</div>
            ) : (
              <Button
                backgroundColor={`bg-${hint.type}`}
                onClick={e => this.accessHint(hint)}
              >
                {hintType} Hint
              </Button>
            )}
          </div>
        );
      });
    }
  }

 // nextPuzzle(puzzleID){

 //    if (puzzleID < 6)
 //    {
 //      puzzleID += 1;
 //    }
 //    else
 //      puzzleID = 1;
 // return puzzleID;
 //  }

  render() {
    const { puzzle } = this.props;


    if (!puzzle) {
      return <NotFound />;
    }
    return (
      <div id="puzzle" className="bg-white">
        <section id="content" className="h-100 bg-white dib fl">
          {puzzle.puzzle_type === "audio" ? (
            <AudioPuzzle puzzle={puzzle} />
          ) : (
            <ImagePuzzle id="puzzle-pic" puzzle={puzzle} />
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
            <div id="puzzle-buttons">
              <Button className="prev-next">Previous Puzzle</Button>
              <Button className="prev-next">Next Puzzle</Button>
            </div>
          </div>

          <img id="logo" src={require("../logo.png")} alt="Logo" />
        </section>
      </div>
    );
  }
}
