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
        <img id="logo" src="https://scontent-ort2-1.xx.fbcdn.net/v/t1.15752-9/32783549_10216303580166865_1556274072491393024_n.png?_nc_cat=0&oh=50b04ddfabf0a42cf2cd464c49ed54b3&oe=5B939352" alt="Logo"></img>
        <form class="inputForm">
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
            backgroundColor="bg-gold"
            onClick={() => this.onSubmitCredentials()}
          >
            Login
          </Button>
        </form>
        <div>
          <label className="error karla gray f6 antialias mt1 text">
            Don't have an account?{" "}
            <Link to={"/register"}>Create an account</Link>
          </label>
        </div>
      </div>
    );
  }
}
