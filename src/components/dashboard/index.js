import React, { Component } from "react";
import Button from "../common/button";
import Input from "../common/input";
import { Link } from "react-router-dom";

/* Subsections */
import Profile from "./profile";
import Teams from "./team";
import Puzzles from "./puzzles";
import Nav from "./nav";

export default class DashboardPage extends Component {
  constructor(props) {
    super(props);

    this.tabs = ["Profile", "Teams", "Puzzles"];
    this.state = {
      tab: 0,
      name: "",
      hasTeam: false
    };
  }

  componentWillMount() {
    if (this.props.player && this.props.player.team_id) {
      this.props.getTeamById(this.props.player.team_id).then(() => {
        this.setState({ hasTeam: true });
      });
    }

    this.props.getAllPuzzles();
  }

  changeTab = (tab = 0) => {
    this.setState({ tab });
  };

  addTeam = async () => {
    this.props.registerTeam(this.state.name);
  };

  renderTab() {
    switch (this.state.tab) {
      case 0:
        return (
          <Profile
            hasTeam={this.state.hasTeam}
            changeTab={this.changeTab}
            {...this.props}
          />
        );
      case 1:
        return <Teams {...this.props} />;
      case 2:
        return <Puzzles {...this.props} />;
      default:
        return <Profile {...this.props} />;
    }
  }

  render() {
    return (
      <div id="dashboard" className="white karla bg-hck-navy h-100">
        <Nav tab={this.state.tab} tabs={this.tabs} changeTab={this.changeTab} />
        <div id="content" className="w-100">
          {this.renderTab()}
        </div>
      </div>
    );
  }
}
