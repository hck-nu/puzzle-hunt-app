import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { register, goto } from "../modules/player";
import RegistrationPage from "../components/registration";

class RegistrationContainer extends Component {
  componentWillMount() {
    if (this.props.isLoggedIn) {
      this.props.goto("/dashboard");
    }
  }

  render() {
    return <RegistrationPage {...this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.player.isLoggedIn,
    player: state.player.player
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      register,
      goto
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(
  RegistrationContainer
);
