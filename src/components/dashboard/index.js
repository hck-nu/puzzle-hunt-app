import React, { Component } from "react";
import Button from "../common/button";
import Input from "../common/input";
import { Link } from "react-router-dom";

export default class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div id="dashboard">DashboardPage</div>;
  }
}
