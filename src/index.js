import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from "history";
import { Switch, Route, Redirect, Router } from "react-router-dom";

import "./assets/vendor/bootstrap/css/bootstrap.min.css";
import "./assets/vendor/font-awesome/css/all.min.css";

import "./assets/vendor/bootstrap-select/css/bootstrap-select.min.css";
import "./assets/vendor/currency-flags/css/currency-flags.min.css";
import "./assets/vendor/daterangepicker/daterangepicker.css";
import "./assets/vendor/owl.carousel/assets/owl.carousel.min.css";
import "./assets/css/stylesheet.css";

import Login from "../src/components/auth/login";
import ForgotPass from "../src/components/auth/ForgotPass";
import Dashboard from "../src/components/dashboard";
import Transactions from "../src/components/Transactions";
import SendMoney from "../src/components/SendMoney";

const hist = createBrowserHistory();

ReactDOM.render(
  <React.Fragment>
  <Router history={hist}>
      <Switch>        
       <Route path="/forgotpassword" component={ForgotPass} /> 
        <Route path="/dashboard" component={Dashboard} /> 
        <Route path="/transactions" component={Transactions} /> 
        <Route path="/sendmoney" component={SendMoney} /> 

        <Route path={["/", "/login"]} component={Login} />
        <Redirect from="/" to="/login" />

      </Switch>
    </Router>
  </React.Fragment>,
  document.getElementById('root')
);
