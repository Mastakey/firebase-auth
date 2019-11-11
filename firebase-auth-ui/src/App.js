import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

//Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTH } from "./redux/types";
import { getUserData } from "./redux/actions/userActions";

//Auth
import jwtDecode from "jwt-decode";
import axios from "axios";

//Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Logout from "./pages/Logout";
import Forgot from "./pages/Forgot";
import NavBar from "./components/nav/NavBar";

//Token
axios.defaults.baseURL =
  "https://us-central1-build-react-web.cloudfunctions.net/api";

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  //console.log(decodedToken);
  if (decodedToken.exp * 1000 < Date.now()) {
    //Expired token
    //window.location.href = '/login';
    //store.dispatch(logoutUser());
    //window.location.href = '/';
  } else {
    store.dispatch({ type: SET_AUTH });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <NavBar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/logout" component={Logout} />
              <Route exact path="/forgotpass" component={Forgot} />
            </Switch>
          </div>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
