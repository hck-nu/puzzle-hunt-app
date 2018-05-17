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
    this.state = {
      name: ""
    };
  }

  componentWillMount = async () => {
    if (this.props.player && this.props.player.team_id) {
      await this.props.getTeamById(this.props.player.team_id);
    }

    this.props.getAllPuzzles();
  };

  renderTab() {
    switch (this.props.tab) {
      case 0:
        return <Profile changeTab={this.props.changeTab} {...this.props} />;
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
        <Nav
          {...this.props}
          tab={this.props.tab}
          tabs={this.props.tabs}
          changeTab={this.props.changeTab}
        />
        <div id="content" className="w-100">
          {this.renderTab()}
        </div>
      </div>
    );
  }
}
