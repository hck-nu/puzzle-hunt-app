import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";

/* Containers */
import Home from "./home";
import Puzzle from "./puzzle";
import Registration from "./registration";
import Login from "./login";
import Dashboard from "./dashboard";
import NotFound from "../components/not_found";

class AppContainer extends Component {
  render() {
    const { isLoggedIn } = this.props;
    return (
      <div className="w-100 h-100">
        <header
          className="mw9 pt4 center right-0 fixed"
          ref={e => (this.appElement = e)}
        >
          <div className="flex pr4-ns">{isLoggedIn && <div>Button</div>}</div>
        </header>
        <main className="w-100 h-100">
          <Switch>
            <Route
              exact
              path="/"
              render={() => <Home isLoggedIn={isLoggedIn} />}
            />
            <Route
              exact
              path="/puzzle/:id"
              component={props => <Puzzle id={props.match.params.id} />}
            />
            <Route
              exact
              path="/register"
              component={props => <Registration />}
            />
            <Route exact path="/login" component={props => <Login />} />
            <Route exact path="/dashboard" component={props => <Dashboard />} />
            <Route component={NotFound} />
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
