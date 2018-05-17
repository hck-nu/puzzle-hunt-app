import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { login, goto } from "../modules/player";
import LoginPage from "../components/login";

class LoginContainer extends Component {
  componentWillMount() {
    if (this.props.isLoggedIn) {
      this.props.goto("/dashboard");
    }
  }

  render() {
    return <LoginPage {...this.props} />;
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
      login,
      goto
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
