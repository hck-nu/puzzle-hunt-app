import React, { Component } from "react";
import Button from "../common/button";
import Input from "../common/input";
import { Link } from "react-router-dom";

export default class LoginPage extends Component {
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
    this.resetForm();
    await this.props.login(email, password);
  };

  render() {
    return (
      <div id="login">
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
          />
          <Button
            backgroundColor="bg-pink"
            onClick={() => this.onSubmitCredentials()}
          >
            Login
          </Button>
        </form>
        <div>
          <label>
            Don't have an account?{" "}
            <Link to={"/register"}>Create an account</Link>
          </label>
        </div>
      </div>
    );
  }
}