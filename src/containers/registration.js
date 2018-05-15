import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { register } from "../modules/player";
import RegistrationPage from "../components/registration";

class RegistrationContainer extends Component {
  render() {
    return <RegistrationPage {...this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    player: state.player.player
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      register
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(
  RegistrationContainer
);
