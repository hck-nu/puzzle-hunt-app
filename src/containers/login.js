import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { login } from "../modules/player";
import LoginPage from "../components/login";

class LoginContainer extends Component {
  render() {
    return <LoginPage {...this.props} />;
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
      login
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
