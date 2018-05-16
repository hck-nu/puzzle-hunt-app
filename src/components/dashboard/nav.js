import React, { Component } from "react";

export default class Nav extends Component {
  loadTabs() {
    const tabs = this.props.tabs || [];
    return tabs.map((tab, i) => {
      return (
        <button key={i} onClick={e => this.props.changeTab(i)}>
          <li>{tab}</li>
        </button>
      );
    });
  }
  render() {
    return (
      <nav>
        <ul>{this.loadTabs()}</ul>
      </nav>
    );
  }
}
