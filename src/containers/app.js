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
import Banner from "../containers/banner";

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.tabs = ["Profile", "Join Team", "Puzzles"];
    this.state = {
      tab: 0
    };
  }

  changeTab = (tab = 0) => {
    this.setState({ tab });
  };

  render() {
    const { isLoggedIn, bannerIsShown, bannerText, bannerColor } = this.props;
    console.log(bannerText);
    return (
      <div className="w-100 min-vh-100">
        {bannerText ? (
          <Banner isShown={bannerIsShown} color={bannerColor}>
            {bannerText}
          </Banner>
        ) : null}
        <main className="w-100 min-vh-100">
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
            <Route
              exact
              path="/dashboard"
              component={props => (
                <Dashboard
                  tabs={this.tabs}
                  tab={this.state.tab}
                  changeTab={this.changeTab}
                />
              )}
            />
            <Route component={NotFound} />
          </Switch>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.player.isLoggedIn,
    bannerText: state.banner.text,
    bannerIsShown: state.banner.isShown,
    bannerColor: state.banner.color
  };
};

export default withRouter(connect(mapStateToProps, null)(AppContainer));
