import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { registerTeam } from "../modules/team";
import DashboardPage from "../components/dashboard";

class DashboardContainer extends Component {
  render() {
    return <DashboardPage {...this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    team: state.team.team,
    player: state.player.player
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
