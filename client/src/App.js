import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { getCurrentProfile } from "./actions/userDataActions";
import PrivateRoute from "./components/common/PrivateRoute";

import { Provider } from "react-redux";
import store from "./store";

import "./App.css";
import "antd/dist/antd.css";

// Components

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import ActiveEmail from "./components/auth/ActiveEmail";
import DashboardPokemons from "./components/pokemons/DashboardPokemons";
import Profile from "./components/profile/Profile";
import PokemonProfile from "./components/pokemonProfile/PokemonProfile";
import Compare from "./components/compare/Compare";
import Test from "./components/Test";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  store.dispatch(getCurrentProfile());
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/activeemail" component={ActiveEmail} />
              {/* <Route exact path="/activeemail/:id" component={ActiveEmail} /> */}
              <Route exact path="/dashboard" component={DashboardPokemons} />
              <Route exact path="/pokemon/:id" component={PokemonProfile} />
              <Switch>
                <PrivateRoute exact path="/profile" component={Profile} />
                <PrivateRoute exact path="/compare" component={Compare} />
                <PrivateRoute exact path="/test" component={Test} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
