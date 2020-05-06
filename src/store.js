import firebase from "firebase/app";
import "firebase/firestore"; // <- needed if using firestore
import { createStore, combineReducers, compose } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore"; // <- needed if using firestore
import notifyReducer from "./reducers/NotifyReducer";
import settingReducer from "./reducers/SettingReducer";

const fbConfig = {
  apiKey: "AIzaSyB7peyo7O-hv6LFUWyI46I1z1QfsNYqcYE",
  authDomain: "reactreduxclientportal.firebaseapp.com",
  databaseURL: "https://reactreduxclientportal.firebaseio.com",
  projectId: "reactreduxclientportal",
  storageBucket: "reactreduxclientportal.appspot.com",
  messagingSenderId: "589623437140",
  appId: "1:589623437140:web:9fb4c6e7a43d44f1f5cac1",
  measurementId: "G-TELPDGCE4E"
};

// Initialize firebase instance
firebase.initializeApp(fbConfig);

// Initialize other services on firebase instance
firebase.firestore(); // <- needed if using firestore
// firebase.functions() // <- needed if using httpsCallable

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer, // <- needed if using firestore
  notify: notifyReducer,
  settings: settingReducer
});

// Check localStorage and init settings value.
if (localStorage.getItem("settings") == null) {
  const defaultSetting = {
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: false,
    allowRegistration: false
  };
  localStorage.setItem("settings", JSON.stringify(defaultSetting));
}

// Create store with reducers and initial state
const initialState = {
  settings: JSON.parse(localStorage.getItem("settings"))
};
const store = createStore(
  rootReducer,
  initialState,
  compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
