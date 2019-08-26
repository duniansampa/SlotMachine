import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { createBrowserHistory } from "history";
import configureStore from "./store/ConfigureStore";
import MainLayout from "layouts/Main/Main.jsx";

import "assets/css/nucleo-icons.css";
import "assets/scss/slot-machine.scss?v=1.0.0";
import "assets/demo/demo.css";

// Create browser history to use in the Redux store
const baseUrl = process.env.PUBLIC_URL + "/";
//PUBLIC_URL
const history = createBrowserHistory({ basename: baseUrl });

// Get the application-wide store instance, prepopulating with state from the server where available.
const initialState = window.initialReduxState;
const store = configureStore(history, initialState);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Router>
        <Switch>
          <Route path="/main" render={props => <MainLayout {...props} />} />
          <Redirect from="/" to="/main/slot-machine" />
        </Switch>
      </Router>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
