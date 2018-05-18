import React, { Component } from "react";
import Button from "../common/button";
import Input from "../common/input";
import { Link } from "react-router-dom";
import validate from "../common/validate";
import "../../css/regloginstyle.css";

export default class RegistrationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: ""
    };
  }

  onEmailInputUpdate(email) {
    this.setState({
      email,
      error: ""
    });
  }

  onPasswordUpdate(password) {
    this.setState({
      password,
      error: ""
    });
  }

  resetForm() {
    this.setState({
      email: "",
      password: "",
      error: ""
    });
  }

  onSubmitCredentials = async () => {
    const { email, password } = this.state;

    if (!validate.isEmail(email)) {
      this.setState({
        error: "Must give a valid email before registering"
      });
      return;
    }

    if (!validate.isValidPassword(password)) {
      this.setState({
        error:
          "Must provide a password with 8 or more characters, with at least one letter and one number."
      });
      return;
    }

    this.resetForm();
    await this.props.register(email, password);
  };

  render() {
    return (
      <div id="registration" className="w-100 min-vh-100">
        <img id="logo" src={require("../logo.png")} alt="Logo" />
        <div id="form-container">
          <form
            className="input-form"
            onSubmit={e => {
              e.preventDefault();
              this.onSubmitCredentials();
            }}
          >
            {this.state.error && (
              <label className="white pb3 dib lh-copy f6">
                {this.state.error}
              </label>
            )}
            <Input
              class="field"
              placeholder="Email"
              type="text"
              value={this.state.email}
              onChange={e => this.onEmailInputUpdate(e.target.value)}
            />
            <Input
              class="field"
              placeholder="Password *"
              value={this.state.password}
              onChange={e => this.onPasswordUpdate(e.target.value)}
              type="password"
              memo="* Minimum of 8 characters, with at least one letter and one number"
            />
            <Button
              className="w-100 mt2"
              backgroundColor="bg-gold"
              type="submit"
            >
              Register
            </Button>
          </form>
          <div>
            <label className="error karla gray f6 antialias mt1 text">
              Have an account?{" "}
              <Link className="tabbed-link white" to={"/login"}>
                Login
              </Link>
            </label>
          </div>
        </div>
      </div>
    );
  }
}
