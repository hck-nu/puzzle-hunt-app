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

  renderTeam() {
    if (this.props.player.team_id && this.props.team) {
      return (
        <div>
          <label>Team name: {this.props.team.name}</label>
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
          <h3>Player</h3>
          {this.renderPlayer()}
        </section>
        <section id="team-profile">
          <h3>Team</h3>
          {this.renderTeam()}
        </section>
      </div>
    );
  }
}
