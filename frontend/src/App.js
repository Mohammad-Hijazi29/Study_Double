import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import LoginPage from "./authPages/LoginPage/LoginPage";
import RegisterPage from "./authPages/RegisterPage/RegisterPage";
import Dashboard from "./Dashboard/Dashboard";
import AlertNotification from "./shared/components/AlertNotification";
import Home from "./Home/Home";
import Explore from "./Explore/Explore";
import PublicProfile from "./Profile/PublicProfile";
import PersonalProfile from "./Profile/PersonalProfile";
import PersonalProfile2 from "./Profile/PersonalProfile2";
import PersonalityTest from "./Profile/PersonalityTest";
import EditProfile from "./Profile/EditProfile";
// import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/register">
            <RegisterPage />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/">
            <Redirect to='/home' />
          </Route>
          <Route exact path="/explore">
            <Explore />
          </Route>
          <Route exact path="/profile/:id"> 
            <PublicProfile />
          </Route>
          <Route exact path="/edit-profile">
            <PersonalProfile />
          </Route>
          <Route exact path="/edit-my-profile">
            <EditProfile />
          </Route>
          <Route exact path="/my-profile">
            <PersonalProfile2 />
          </Route>
          <Route exact path='/personality-test'>
            <PersonalityTest />
          </Route>
        </Switch>
      </Router>
      <AlertNotification />
    </>
  );
}

export default App;
