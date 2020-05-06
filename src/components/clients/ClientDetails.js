import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Loading from "../share/loading/loading";
import BackToDashboard from "../share/links/BackToDashboard";
import classnames from "classnames";
import Input from "../share/form/input";

class ClientDetails extends Component {
  state = {
    showBalanceUpdateForm: false,
    balanceUpdateAmount: ""
  };
  toggleBalanceUpdate = () =>
    this.setState({
      showBalanceUpdateForm: !this.state.showBalanceUpdateForm
    });

  onChange = e => this.setState({ [e.target.name]: e.target.value });
  onBalanceSubmit = e => {
    e.preventDefault();

    const { client, firestore } = this.props;
    const { balanceUpdateAmount } = this.state;

    const balanceUpdate = {
      balance: parseFloat(balanceUpdateAmount)
    };
    // Update balance to firestore
    firestore.update({ collection: "clients", doc: client.id }, balanceUpdate);
  };
  onClientDelete = () => {
    const { client, firestore, history } = this.props;
    firestore.delete({ collection: "clients", doc: client.id }).then(() => {
      history.push("/");
    });
  };
  render() {
    const { client } = this.props;
    const { showBalanceUpdateForm, balanceUpdateAmount } = this.state;

    let balanceForm = "";

    if (showBalanceUpdateForm) {
      balanceForm = (
        <form onSubmit={this.onBalanceSubmit}>
          <div className="input-group">
            <Input
              className="form-control"
              name="balanceUpdateAmount"
              value={balanceUpdateAmount}
              onChange={this.onChange}
            />
            <div className="input-group-append">
              <input
                type="submit"
                value="Update"
                className="btn btn-outline-dark"
              />
            </div>
          </div>
        </form>
      );
    } else {
      balanceForm = null;
    }

    if (client) {
      return (
        <div>
          <div className="row">
            <div className="col-sm-6">
              <BackToDashboard />
            </div>
            <div className="col-sm-6">
              <div className="btn-group float-right">
                <Link to={`/client/edit/${client.id}`} className="btn btn-dark">
                  Edit
                </Link>
                <div className="btn btn-danger" onClick={this.onClientDelete}>
                  Delete
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="card">
            <h3 className="card-header">
              {client.firstName} {client.lastName}
            </h3>
            <div className="card-body">
              <div className="row">
                <div className="col-sm-8">
                  <h5>
                    Client ID:{" "}
                    <span className="text-secondary">{client.id}</span>
                  </h5>
                </div>
                <div className="col-sm-4">
                  <h5 className="text-right">
                    Balance:{" "}
                    <span
                      className={classnames({
                        "text-danger": client.balance > 0,
                        "text-success": client.balance === 0
                      })}
                    >
                      <strong>${parseFloat(client.balance).toFixed(2)}</strong>
                    </span>{" "}
                    <small>
                      <a href="#!" onClick={this.toggleBalanceUpdate}>
                        <i className="fas fa-pencil-alt"></i>
                      </a>
                    </small>
                  </h5>
                  {balanceForm}
                </div>
              </div>
              <hr />
              <ul className="list-group">
                <li className="list-group-item">
                  Contact Email: {client.email}
                </li>
                <li className="list-group-item">
                  Contact Phone: {client.phone}
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    } else {
      return <Loading />;
    }
  }
}

ClientDetails.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [
    { collection: "clients", storeAs: "client", doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    client: ordered.client && ordered.client[0]
  }))
)(ClientDetails);
