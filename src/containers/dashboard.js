import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  submitTeam,
  leaveTeam,
  getTeamByName,
  getTeamById,
  getLeaderboard
} from "../modules/team";
import { getAllPuzzles } from "../modules/puzzle";
import { logout } from "../modules/player";
import DashboardPage from "../components/dashboard";

class DashboardContainer extends Component {
  componentWillMount() {
    if (!this.props.isLoggedIn) {
      this.props.logout();
    }
  }

  render() {
    return <DashboardPage {...this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.player.isLoggedIn,
    team: state.team.team,
    player: state.player.player,
    puzzles: state.puzzle.puzzles,
    leaderboard: state.team.leaderboard
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      submitTeam,
      getAllPuzzles,
      getTeamByName,
      leaveTeam,
      getTeamById,
      logout,
      getLeaderboard
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
