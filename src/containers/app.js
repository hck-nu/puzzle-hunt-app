import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";

/* Containers */
import Home from "./home";

class AppContainer extends Component {
  render() {
    const { isLoggedIn } = this.props;
    return (
      <div>
        <header
          className="mw9 pt4 center right-0 fixed"
          ref={e => (this.appElement = e)}
        >
          <div className="flex pr4-ns">{isLoggedIn && <div>Button</div>}</div>
        </header>
        <main>
          <Switch>
            <Route
              exact
              path="/"
              render={() => <Home isLoggedIn={isLoggedIn} />}
            />
          </Switch>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.isLoggedIn
  };
};

export default withRouter(connect(mapStateToProps, null)(AppContainer));
