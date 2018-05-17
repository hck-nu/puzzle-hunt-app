import React, { Component } from "react";
import Button from "../common/button";
import Input from "../common/input";

export default class Profile extends Component {
  renderPlayer() {
    if (this.props.player) {
      const player = this.props.player;
      return (
        <div>
          <ul>
            <li>{player.username}</li>
            <li>{player.email}</li>
          </ul>
        </div>
      );
    }

    return null;
  }

  renderTeamMembers() {
    if (this.props.team && this.props.team.Players) {
      return this.props.team.Players.map((player, i) => {
        return <div key={i}>{player.username}</div>;
      });
    }
  }

  renderTeam() {
    if (this.props.player && this.props.player.team_id && this.props.team) {
      return (
        <div>
          <label>Team name: {this.props.team.name}</label>
          <div className="team-members">{this.renderTeamMembers()}</div>
          <Button
            className="bg-pink"
            onClick={e => {
              e.preventDefault();
              this.props.leaveTeam();
            }}
          >
            Leave team
          </Button>
        </div>
      );
    }

    return (
      <div>
        You have not yet joined a team!{" "}
        <a className="tabbed-link" onClick={e => this.props.changeTab(1)}>
          Join a team
        </a>
      </div>
    );
  }

  render() {
    return (
      <div id="profile">
        <section id="user-profile">
          <h3 className="ma0">Player</h3>
          {this.renderPlayer()}
        </section>
        <section id="team-profile">
          <h3 className="ma0">Team</h3>
          {this.renderTeam()}
        </section>
      </div>
    );
  }
}
