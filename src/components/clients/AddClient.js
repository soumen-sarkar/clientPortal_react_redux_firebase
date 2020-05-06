import React, { Component } from "react";
import Input from "../share/form/input";
import BackToDashboard from "../share/links/BackToDashboard";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class AddClient extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    balance: ""
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });
  onSubmit = e => {
    e.preventDefault();
    const newClient = this.state;
    // Set 0 if no balance
    if (newClient.balance === "") {
      newClient.balance = 0;
    }
    const { firestore, history } = this.props;
    firestore
      .add({ collection: "clients" }, newClient)
      .then(() => history.push("/"));
  };

  render() {
    const { firstName, lastName, email, phone, balance } = this.state;
    const { disableBalanceOnAdd } = this.props.settings;
    return (
      <div>
        <div className="row">
          <div className="col-sm-12">
            <BackToDashboard />
          </div>
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">Add Client</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <Input
                      label="First Name"
                      name="firstName"
                      value={firstName}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <Input
                      label="Last Name"
                      name="lastName"
                      value={lastName}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <Input
                      label="Email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <Input
                      label="Phone"
                      name="phone"
                      value={phone}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <Input
                      label="Balance"
                      name="balance"
                      value={balance}
                      onChange={this.onChange}
                      disabled={disableBalanceOnAdd}
                    />
                  </div>
                  <input
                    type="submit"
                    value="Add Client"
                    className="btn btn-block btn-primary"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddClient.propTypes = {
  firestore: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(),
  connect((state, props) => ({
    settings: state.settings
  }))
)(AddClient);
