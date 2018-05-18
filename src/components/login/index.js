import React, { Component } from "react";
import Button from "../common/button";
import Input from "../common/input";
import { Link } from "react-router-dom";

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  onEmailInputUpdate(email) {
    this.setState({
      email
    });
  }

  onPasswordUpdate(password) {
    this.setState({
      password
    });
  }

  resetForm() {
    this.setState({
      email: "",
      password: ""
    });
  }

  onSubmitCredentials = async () => {
    const { email, password } = this.state;

    this.resetForm();
    await this.props.login(email, password);
  };

  render() {
    return (
      <div id="login" className="w-100 min-vh-100">
        <img id="logo" src={require("../logo.png")} alt="Logo" />
        <div id="form-container">
          <form
            className="input-form"
            onSubmit={e => {
              e.preventDefault();
              this.onSubmitCredentials();
            }}
          >
            <Input
              placeholder="Email"
              type="text"
              value={this.state.email}
              onChange={e => this.onEmailInputUpdate(e.target.value)}
            />
            <Input
              placeholder="Password"
              value={this.state.password}
              onChange={e => this.onPasswordUpdate(e.target.value)}
              type="password"
            />
            <Button
              className="w-100 mt2"
              backgroundColor="bg-gold"
              type="submit"
            >
              Login
            </Button>
          </form>
          <div>
            <label className="karla gray f6 antialias mt1 text">
              Don't have an account?{" "}
              <Link className="tabbed-link white" to={"/register"}>
                Create an account
              </Link>
            </label>
          </div>
        </div>
      </div>
    );
  }
}
