import React, { Component } from "react";
import Button from "../common/button";
import Input from "../common/input";
import { Link } from "react-router-dom";
import validate from "../common/validate";
import "../../css/regloginstyle.css"

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
        <img id="logo" src="https://scontent-ort2-1.xx.fbcdn.net/v/t1.15752-9/32783549_10216303580166865_1556274072491393024_n.png?_nc_cat=0&oh=50b04ddfabf0a42cf2cd464c49ed54b3&oe=5B939352" alt="Logo"></img>
        <form class="inputForm">
          <label className="error karla gray f6 antialias mt1">
            {this.state.hasError ? this.state.errorLabel : null}
          </label>
          <Input
            class="field"
            placeholder="Email"
            type="text"
            value={this.state.email}
            onChange={e => this.onEmailInputUpdate(e.target.value)}
          />
          <Input
            class="field"
            placeholder="Password"
            value={this.state.password}
            onChange={e => this.onPasswordUpdate(e.target.value)}
            type="password"
            memo="Minimum of 8 characters, with at least one letter and one number"
          />
          <Button
            backgroundColor="bg-gold"
            onClick={() => this.onSubmitCredentials()}
          >
            Register
          </Button>
        </form>
        <div>
          <label className="error karla gray f6 antialias mt1 text">
            Have an account? <Link to={"/login"}>Login</Link>
          </label>
        </div>
      </div>
    );
  }
}
