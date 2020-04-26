import React, { useEffect } from "react";
import Header from "./components/layout/Header";
import MapDashboard from "./components/Map/MapDashboard";
import About from "./components/Pages/About";
import FAQ from "./components/Pages/FAQ";
import Resources from "./components/Pages/Resources";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RegisterForm from "./components/accounts/RegisterForm";
// if deployed to apache, mess with congig htt file
// import { Provider as AlertProvider } from "react-alert";
// import AlertTemplate from "react-alert-template-basic";
import { Provider } from "react-redux";
import store from "./store";
import LoginForm from "./components/accounts/LoginForm";

import PrivateRoute from "./components/common/PrivateRoute";
import { loadUser } from "./actions/auth";

import Manage from "./components/AdminMod/Manage";

import Settings from "./components/profile/ProfileSettings";

import ForgotPasswordForm from "./components/accounts/ForgotPasswordForm";
import Support from "./components/Pages/Support";
import ResetPasswordForm from "./components/accounts/ResetPasswordForm";
import ContactUs from "./components/Pages/ContactUs";
import ProfileDashboard from "./components/profile/ProfileDashboard";
import NotFoundPage from "./components/Pages/NotFoundPage";

export default function App() {
  useEffect(() => store.dispatch(loadUser()), []);

  return (
    <Provider store={store}>
      <Router>
        <>
          <Header />
          <div>
            {/*<div className="container-fluid" style={divStyle}>*/}
            <Switch>
              <Route exact path="/" component={MapDashboard} />
              <Route exact path="/story" component={MapDashboard} />
              <Route exact path="/story/:id" component={MapDashboard} />
              <Route exact path="/About" component={About} />
              <Route exact path="/resources" component={Resources} />
              {/*<Route path="/Story/:id" exact component={Story} />*/}
              <Route exact path="/faq" component={FAQ} />
              <Route exact path="/login" component={LoginForm} />
              <Route exact path="/register" component={RegisterForm} />
              <Route exact path="/users/:name" component={ProfileDashboard} />
              <Route exact path="/users/:name/settings" component={Settings} />
              <Route exact path="/users" component={ProfileDashboard} />
              <PrivateRoute exact path="/manage" component={Manage} />
              <PrivateRoute exact path="/manage/flag" component={Manage} />
              <PrivateRoute exact path="/manage/users" component={Manage} />
              <PrivateRoute exact path="/manage/comments" component={Manage} />
              <PrivateRoute exact path="/manage/category" component={Manage} />
              {/*<Route path="/Story/:id/edit" exact component={EditStory} />*/}
              <Route path="/forgotPassword" component={ForgotPasswordForm} />
              <Route path="/resetPassword" component={ResetPasswordForm} />
              <Route path="/Support" component={Support} />
              <Route path="/ContactUs" component={ContactUs} />
              <Route component={NotFoundPage} />
              {/* <MapDashboard /> */}
            </Switch>
          </div>
        </>
      </Router>
    </Provider>
  );
}
