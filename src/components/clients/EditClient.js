import React, { Component } from "react";
// import Input from "../share/form/input";
import BackToDashboard from "../share/links/BackToDashboard";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Loading from "../share/loading/loading";

class EditClient extends Component {
  constructor(props) {
    super(props);
    this.firstNameInput = React.createRef();
    this.lastNameInput = React.createRef();
    this.emailInput = React.createRef();
    this.phoneInput = React.createRef();
    this.balanceInput = React.createRef();
  }

  onSubmit = e => {
    e.preventDefault();

    // Update client
    const updateClient = {
      firstName: this.firstNameInput.current.value,
      lastName: this.lastNameInput.current.value,
      email: this.emailInput.current.value,
      phone: this.phoneInput.current.value,
      balance: this.balanceInput.current.value
    };

    const { client, firestore, history } = this.props;
    firestore
      .update({ collection: "clients", doc: client.id }, updateClient)
      .then(() => history.push("/"));
  };

  render() {
    const { client } = this.props;
    const { disableBalanceOnEdit } = this.props.settings;
    if (client) {
      return (
        <div>
          <div className="row">
            <div className="col-sm-12">
              <BackToDashboard />
            </div>
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header">Edit Client</div>
                <div className="card-body">
                  <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <label htmlFor={client.firstName}>First Name</label>
                      <input
                        className="form-control"
                        type="text"
                        name="firstName"
                        ref={this.firstNameInput}
                        defaultValue={client.firstName}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor={client.lastName}>Last Name</label>
                      <input
                        className="form-control"
                        type="text"
                        name="lastName"
                        ref={this.lastNameInput}
                        defaultValue={client.lastName}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor={client.email}>Email</label>
                      <input
                        className="form-control"
                        type="text"
                        name="email"
                        ref={this.emailInput}
                        defaultValue={client.email}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor={client.phone}>Phone</label>
                      <input
                        className="form-control"
                        type="text"
                        name="phone"
                        ref={this.phoneInput}
                        defaultValue={client.phone}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor={client.balance}>Balance</label>
                      <input
                        className="form-control"
                        type="text"
                        name="balance"
                        disabled={disableBalanceOnEdit}
                        ref={this.balanceInput}
                        defaultValue={client.balance}
                      />
                    </div>
                    <input
                      type="submit"
                      value="Edit Client"
                      className="btn btn-block btn-primary"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <Loading />;
    }
  }
}

EditClient.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [
    { collection: "clients", storeAs: "client", doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered }, settings }, props) => ({
    client: ordered.client && ordered.client[0],
    settings
  }))
)(EditClient);
