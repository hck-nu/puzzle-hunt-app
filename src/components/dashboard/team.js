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
    this.setState({
      name
    });
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
      <div id="create-team" className="w-100">
        <form
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
          <Button type="submit">Join</Button>
        </form>
      </div>
    );
  }
}
