import React, { Component } from "react";
import Button from "../common/button";

export default class Profile extends Component {
  componentWillMount() {
    this.props.getLeaderboard();
  }

  renderTeamMembers() {
    if (this.props.team && this.props.team.Players) {
      return this.props.team.Players.map((player, i) => {
        return (
          <p key={i} className="lh-copy ma0 pl2">
            {player.username}
          </p>
        );
      });
    }
  }

  renderLeaderboard() {
    if (!this.props.leaderboard) return <div>No teams on the leaderboard</div>;

    return this.props.leaderboard.map((team, i) => {
      return (
        <div key={i} className="leaderboard-item pa3">
          <span className="b mr2">{i + 1}.</span>
          <span className="leaderboard-item-team-name f4">{team.name}</span>
          <span className="leaderboard-item-team-points fr ttu f6">
            {team.point_total} <span className="ml2">complete</span>
          </span>
        </div>
      );
    });
  }

  renderTeam() {
    if (this.props.player && this.props.player.team_id && this.props.team) {
      return (
        <div>
          <p className="ma0 lh-copy pb1">
            <span className="b">Team name:</span> {this.props.team.name}
          </p>
          <div className="team-members pb1">
            <p className="ma0 b">Team members:</p>
            {this.renderTeamMembers()}
          </div>
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
      <div id="profile" className="pt6 cf">
        <section
          id="team-stats"
          className="dib fl near-black bg-near-white pa3 fixed"
        >
          <h3 className="mt0 mb2 ttu">Team stats</h3>
          <div id="user-profile">
            <p className="ma0 lh-copy pb1">
              <span className="b">Username:</span>{" "}
              {this.props.player ? this.props.player.username : ""}
            </p>
          </div>
          <div id="team-profile">{this.renderTeam()}</div>
          <div id="puzzle-stats">
            <p className="ma0 lh-copy pb3">
              <span className="b">Completed puzzles: </span>
              {this.props.team && this.props.team.Puzzles
                ? this.props.team.Puzzles.length
                : 0}
            </p>
          </div>
          <Button
            className="bg-pink w-100"
            onClick={e => {
              e.preventDefault();
              this.props.leaveTeam();
            }}
          >
            Leave team
          </Button>
        </section>
        <section id="leaderboard" className="dib fr h-100 pb3">
          <h1 className="mt0">Leaderboard</h1>
          <div>{this.renderLeaderboard()}</div>
        </section>
      </div>
    );
  }
}
