import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UserIsAuthenticated, UserIsNotAuthenticated } from "./helper/Auth";
import firebase from "firebase/app";
import { createFirestoreInstance } from "redux-firestore"; // <- needed if using firestore
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import AppNavbar from "./components/layout/AppNavbar";
import Dashboard from "./components/layout/Dashboard";
import AddClient from "./components/clients/AddClient";
import EditClient from "./components/clients/EditClient";
import ClientDetails from "./components/clients/ClientDetails";
import Settings from "./components/setting/Settings";
import NotFound from "./components/layout/NotFound";

class App extends Component {
  render() {
    const rrfConfig = {
      userProfile: "users",
      useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
    };

    const rrfProps = {
      firebase,
      config: rrfConfig,
      dispatch: store.dispatch,
      createFirestoreInstance // <- needed if using firestore
    };

    return (
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <Router>
            <div className="App">
              <AppNavbar />
              <div className="container">
                <Switch>
                  <Route
                    exact
                    path="/"
                    component={UserIsAuthenticated(Dashboard)}
                  />
                  <Route
                    exact
                    path="/login"
                    component={UserIsNotAuthenticated(Login)}
                  />
                  <Route
                    exact
                    path="/register"
                    component={UserIsNotAuthenticated(Register)}
                  />
                  <Route
                    exact
                    path="/client/add"
                    component={UserIsAuthenticated(AddClient)}
                  />
                  <Route
                    exact
                    path="/client/edit/:id"
                    component={UserIsAuthenticated(EditClient)}
                  />
                  <Route
                    exact
                    path="/client/:id"
                    component={UserIsAuthenticated(ClientDetails)}
                  />
                  <Route
                    exact
                    path="/settings"
                    component={UserIsAuthenticated(Settings)}
                  />
                  <Route component={NotFound} />
                </Switch>
              </div>
            </div>
          </Router>
        </ReactReduxFirebaseProvider>
      </Provider>
    );
  }
}

export default App;
