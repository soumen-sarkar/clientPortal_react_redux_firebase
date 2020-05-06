import React, { Component } from "react";
import PropTypes from "prop-types";
import Input from "../share/form/input";
import { firebaseConnect } from "react-redux-firebase";
import { compose } from "redux";
import { connect } from "react-redux";
import { notifyUser } from "../../actions/NotifyAction";
import Alert from "../../components/share/Alert";
// require("firebase/auth");

class Register extends Component {
  state = {
    email: "",
    password: ""
  };

  componentWillMount() {
    const { allowRegistration } = this.props.settings;
    if (!allowRegistration) {
      this.props.history.push("/");
    }
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });
  onSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    const { firebase, notifyUser } = this.props;
    firebase
      .createUser({ email, password })
      .catch(err => notifyUser("User already exist!", "error"));
  };

  render() {
    const { email, password } = this.state;
    const { message, messageType } = this.props.notify;
    return (
      <div className="row">
        <div className="col-sm-5 mx-auto">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center pb-2 pt-1">
                <span className="text-primary">
                  <i className="fas fa-lock"></i> Register
                </span>
              </h2>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <Input
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <Input
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={this.onChange}
                  />
                </div>
                {message ? (
                  <Alert message={message} messageType={messageType} />
                ) : null}
                <input
                  type="submit"
                  value="Register"
                  className="btn btn-primary btn-block"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  firebase: PropTypes.object.isRequired,
  notify: PropTypes.object.isRequired,
  notifyUser: PropTypes.func.isRequired
};

export default compose(
  firebaseConnect(),
  connect(
    (state, props) => ({
      notify: state.notify,
      settings: state.settings
    }),
    { notifyUser }
  )
)(Register);
