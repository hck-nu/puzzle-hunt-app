import React, { Component } from "react";
import Button from "../common/button";
import Input from "../common/input";
import { Link } from "react-router-dom";
import validate from "../common/validate";

export default class RegistrationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      hasError: false,
      errorLabel: null
    };
  }

  onEmailInputUpdate(email) {
    this.setState({
      hasError: false,
      email
    });
  }

  onPasswordUpdate(password) {
    this.setState({
      hasError: false,
      password
    });
  }

  resetForm() {
    this.setState({
      email: "",
      password: "",
      hasError: false,
      errorLabel: null
    });
  }

  onSubmitCredentials = async () => {
    const { email, password } = this.state;

    if (!validate.isEmail(email)) {
      this.setState({
        hasError: true,
        errorLabel: "Must give a valid email before registering"
      });
      return;
    }

    if (!validate.isValidPassword(password)) {
      this.setState({
        hasError: true,
        errorLabel:
          "Must provide a password with 8 or more characters, with at least one letter and one number."
      });
      return;
    }

    this.resetForm();
    await this.props.register(email, password);
  };

  render() {
    return (
      <div id="registration">
        <form>
          <label className="error karla gray f6 antialias mt1">
            {this.state.hasError ? this.state.errorLabel : null}
          </label>
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
            memo="Minimum of 8 characters, with at least one letter and one number"
          />
          <Button
            backgroundColor="bg-pink"
            onClick={() => this.onSubmitCredentials()}
          >
            Register
          </Button>
        </form>
        <div>
          <label>
            Have an account? <Link to={"/login"}>Login</Link>
          </label>
        </div>
      </div>
    );
  }
}
