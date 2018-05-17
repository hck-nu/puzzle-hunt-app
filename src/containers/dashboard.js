import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  getTeamById,
  registerTeam,
  leaveTeam,
  joinTeam,
  getTeamByName
} from "../modules/team";
import { getAllPuzzles } from "../modules/puzzle";
import DashboardPage from "../components/dashboard";

class DashboardContainer extends Component {
  render() {
    return <DashboardPage {...this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    team: state.team.team,
    player: state.player.player,
    puzzles: state.puzzle.puzzles
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      registerTeam,
      getTeamById,
      getAllPuzzles,
      getTeamByName,
      leaveTeam,
      joinTeam
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
