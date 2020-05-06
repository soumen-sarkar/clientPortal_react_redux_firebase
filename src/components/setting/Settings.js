import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  setAllowRegistration,
  setDisableBalanceOnAdd,
  setDisableBalanceOnEdit
} from "../../actions/SettingsAction";
import BackToDashboard from "../share/links/BackToDashboard";

class Settings extends Component {
  allowRegistrationChange = () => {
    const { setAllowRegistration } = this.props;
    setAllowRegistration();
  };
  disableBalanceOnAddChange = () => {
    const { setDisableBalanceOnAdd } = this.props;
    setDisableBalanceOnAdd();
  };
  disableBalanceOnEditChange = () => {
    const { setDisableBalanceOnEdit } = this.props;
    setDisableBalanceOnEdit();
  };

  render() {
    const {
      disableBalanceOnAdd,
      disableBalanceOnEdit,
      allowRegistration
    } = this.props.settings;

    return (
      <div className="row">
        <div className="col-sm-12">
          <BackToDashboard />
        </div>
        <div className="col-sm-12">
          <div className="card">
            <div className="card-header">Edit Settings</div>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label>Allow Registration</label>{" "}
                  <input
                    type="checkbox"
                    name="allowRegistration"
                    checked={!!allowRegistration}
                    onChange={this.allowRegistrationChange}
                  />
                </div>
                <div className="form-group">
                  <label>Disable balance on add</label>{" "}
                  <input
                    type="checkbox"
                    name="disableBalanceOnAdd"
                    checked={!!disableBalanceOnAdd}
                    onChange={this.disableBalanceOnAddChange}
                  />
                </div>
                <div className="form-group">
                  <label>Disable balance on edit</label>{" "}
                  <input
                    type="checkbox"
                    name="disableBalanceOnEdit"
                    checked={!!disableBalanceOnEdit}
                    onChange={this.disableBalanceOnEditChange}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  settings: PropTypes.object.isRequired,
  setAllowRegistration: PropTypes.func.isRequired,
  setDisableBalanceOnAdd: PropTypes.func.isRequired,
  setDisableBalanceOnEdit: PropTypes.func.isRequired
};

export default connect(
  (state, props) => ({
    auth: state.firebase.auth,
    settings: state.settings
  }),
  { setAllowRegistration, setDisableBalanceOnAdd, setDisableBalanceOnEdit }
)(Settings);
