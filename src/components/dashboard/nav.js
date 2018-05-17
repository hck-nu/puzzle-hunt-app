import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Nav extends Component {
  loadTabs() {
    const tabs = this.props.tabs || [];
    return tabs.map((tab, i) => {
      const isActive = this.props.tab === i;
      return (
        <div
          key={i}
          className={`pt3 pb2 ml3 mr3 pointer nav-item ${
            isActive ? "active" : ""
          }`}
          onClick={e => this.props.changeTab(i)}
        >
          {tab}
        </div>
      );
    });
  }
  render() {
    return (
      <nav className="mw9 center right-0 white w-100">
        <div className="flex pr4-ns fr">
          {this.loadTabs()}
          <a
            onClick={e => {
              e.preventDefault();
              this.props.logout();
            }}
            className="pt3 pb2 ml3 mr3 pointer nav-item"
          >
            Logout
          </a>
        </div>
      </nav>
    );
  }
}
