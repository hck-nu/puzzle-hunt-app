import React, { Component } from "react";
import Button from "../common/button";
import Input from "../common/input";

export default class Teams extends Component {
  render() {
    return (
      <div id="create-team" className="w-100">
        <form>
          <Input placeholder="Enter a team name to join" />
          <Button>Join</Button>
        </form>
      </div>
    );
  }
}
