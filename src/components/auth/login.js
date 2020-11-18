import React, { Component } from "react";
import Logo from "../../assets/images/logoW.png";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Redirect, Link, Switch, Route } from "react-router-dom";

import AuthService from "../../services/auth.service";

// import logo from "assets/img/logo.png";
// import { Swiper, SwiperSlide } from "swiper/react";
// import SwiperCore, { Pagination, Autoplay } from "swiper";
// import "swiper/swiper.scss";
// import "swiper/components/navigation/navigation.scss";
// import "swiper/components/pagination/pagination.scss";
import ForgotPass from "./ForgotPass";

const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };

export default class Login extends Component {
    constructor(props) {
        super(props);
    
        this.logOut = this.logOut.bind(this);
        this.state = {
          currentUser: undefined,
        };
    
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
    
        this.state = {
          username: "",
          password: "",
          loading: false,
          message: "",
        };
      }
    
      componentDidMount() {
        const user = AuthService.getCurrentUser();
    
        if (user) {
          this.setState({
            currentUser: user,
          });
        }
      }

    
      logOut() {
        AuthService.logout();
      }
    
      onChangeUsername(e) {
        this.setState({
          username: e.target.value,
        });
      }
    
      onChangePassword(e) {
        this.setState({
          password: e.target.value,
        });
      }
    
      handleLogin(e) {
        e.preventDefault();
    
        this.setState({
          message: "",
          loading: true,
        });
    
        this.form.validateAll();
    
        if (this.checkBtn.context._errors.length === 0) {
          AuthService.login(this.state.username, this.state.password).then(
            () => {
              this.props.history.push("/dashboard");
              //  window.location.reload();
            },
            (error) => {
              const resMessage =
                error.response &&
                error.response.data &&
                error.response.data.messages ||
                error.message || error.toString();
    
              this.setState({
                loading: false,
                message: resMessage,
              });
            }
          );
        } else {
          this.setState({
            loading: false,
          });
        }
      }

  render() {
    const { currentUser } = this.state;
    return (
      <React.Fragment>
        <div id="main-wrapper" style={{ height: "937px" }}>
        {currentUser ? (
          <Redirect from="/" to="/dashboard" />
        ) : (
          <div className="container-fluid px-0 h-100">
            <div className="row no-gutters h-100">
              {/* Welcome Text */}
              <div className="col-md-6">
                <div className="hero-wrap d-flex align-items-center h-100">
                  <div className="hero-mask opacity-8 bg-primary"></div>
                  <div className="hero-bg hero-bg-scroll  bgLogin"></div>
                  <div className="hero-content mx-auto w-100 h-100 d-flex flex-column">
                    <div className="row no-gutters">
                      <div className="col-10 col-lg-9 mx-auto">
                        <div className="logo mt-5 mb-5 mb-md-0">
                          {" "}
                          <a
                            className="d-flex"
                            href="index.html"
                            title="Payyed - HTML Template"
                          >
                            <img src={Logo} width={150} alt="Payyed" />
                          </a>{" "}
                        </div>
                      </div>
                    </div>
                    <div className="row no-gutters my-auto">
                      <div className="col-10 col-lg-9 mx-auto">
                        <h1 className="text-11 text-white mb-4">
                          Welcome back!
                        </h1>
                        <p className="text-4 text-white line-height-4 mb-5">
                          We are glad to see you again! Instant deposits,
                          withdrawals & payouts trusted by millions worldwide.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Welcome Text End   */}

              {/* Login Form */}
              <div className="col-md-6 d-flex align-items-center">
                <div className="container my-4">
                  <div className="row">
                    <div className="col-11 col-lg-9 col-xl-8 mx-auto">
                      <h3 className="font-weight-400 mb-4">Log In</h3>
                      {/* <form id="loginForm" method="post"> */}
                      <Form
                        onSubmit={this.handleLogin}
                        ref={(c) => {
                        this.form = c;
                        }}
                    >
                        <div className="form-group">
                          <label htmlFor="emailAddress">Email Address</label>
                          {/* <input
                            type="email"
                            className="form-control"
                            id="emailAddress"
                            required
                            placeholder="Enter Your Email"
                          /> */}
                          <Input
                      type="text"
                      required
                      name="username"
                      placeholder="Enter Your Mobile Number"
                      className="form-control"
                      value={this.state.username}
                      onChange={this.onChangeUsername}
                      required
                      validations={[required]}
                      id="mobile-no"
                    />
                        </div>
                        <div className="form-group">
                          <label htmlFor="loginPassword">Password</label>
                          {/* <input
                            type="password"
                            className="form-control"
                            id="loginPassword"
                            required
                            placeholder="Enter Password"
                          /> */}
                          <Input
                      type="password"
                      name="password"
                      placeholder="Enter Password"
                      className="form-control"
                      value={this.state.password}
                      onChange={this.onChangePassword}
                      required
                      validations={[required]}
                      id="password"
                    />
                        </div>
                        <div className="row">
                          <div className="col-sm">
                            <div className="form-check custom-control custom-checkbox">
                              <input
                                id="remember-me"
                                name="remember"
                                className="custom-control-input"
                                type="checkbox"
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="remember-me"
                              >
                                Remember Me
                              </label>
                            </div>
                          </div>
                          <div className="col-sm text-right">
                          <Link
                      to={"/forgotpassword"} className="btn-link" target="_blank">
Forgot Password ?
                      </Link>
                         
                          </div>
                        </div>
                        <button
                          className="btn btn-primary btn-block my-4"
                          type="submit"
                        >
                          Login
                        </button>
                        {this.state.message && (
                     <div
                     className={
                       this.state.successful
                         ? "successMessage"
                         : "failedMessage"
                     }
                   >
                     <br />
                     <p>{this.state.message}</p>
                   </div>
                )}
                <CheckButton
                  style={{ display: "none" }}
                  ref={(c) => {
                    this.checkBtn = c;
                  }}
                />
              </Form>
                      {/* </form> */}
                      <p className="text-3 text-center text-muted">
                        Don't have an account?{" "}
                        <a className="btn-link" href="signup.html">
                          Sign Up
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Login Form End  */}
            </div>
          </div>
        )}
        </div>
        <div>
          <Switch>
            <Route path="/forgotpassword" component={ForgotPass} />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}
