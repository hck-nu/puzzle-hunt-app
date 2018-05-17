import React, { Component } from "react";
import Button from "../common/button";
import Input from "../common/input";

export default class Teams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }

  onChangeName(name) {
    this.setState({ name });
  }

  onTeamNameSubmit = async () => {
    const name = this.state.name;
    this.setState({ name: "" });
    if (this.props.player && this.props.player.team_id) {
      await this.props.leaveTeam();
    }
    await this.props.submitTeam(name);
  };

  render() {
    return (
      <div id="create-team" className="w-100 h-100">
        <div className="form-container h-100 pa2">
          <div>
            <h1 className="ma0 pt6 pb2">Create or join a team!</h1>
            <p className="lh-copy">
              Enter a team name to either create a new team or join an existing
              team of the same name. A team can have at most 4 team members.
            </p>
          </div>
          <form
            className="team-form"
            onSubmit={e => {
              e.preventDefault();
              this.onTeamNameSubmit();
            }}
          >
            <Input
              placeholder="Enter a team name to join"
              value={this.state.name}
              onChange={e => this.onChangeName(e.target.value)}
            />
            <Button backgroundColor="bg-pink w-100 mt2" type="submit">
              Join
            </Button>
          </form>
        </div>
      </div>
    );
  }
}
