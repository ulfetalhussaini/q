import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import MoneyService from "../services/alltransactions.service";
//import AuthService from "../../services/auth.service";
import { Redirect } from "react-router-dom";
import axios from "axios";
import authHeader from "../services/auth-header";
import Navbar from "../components/Navbar";

const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };

  export default class SendMoney extends Component {
    constructor(props) {
      super(props);
      this.handleSend = this.handleSend.bind(this);
      this.onChangeMobile = this.onChangeMobile.bind(this);
      this.onChangeAmount = this.onChangeAmount.bind(this);
      this.onChangePin = this.onChangePin.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.handleClose2 = this.handleClose2.bind(this);
  
      this.state = {
        receiver_mobile_number: "",
        amount: "",
        pin: "",
        successful: false,
        message: "",
        recipient: "",
        mobile_number: "",
        avatar: "",
        invoice_id: "",
        open: false,
        open2: false,
        date: "",
        transaction_id: "",
        transaction_type: "",
        transaction_amount: "",
        transaction_fee: "",
        total_deduction: "",
        title: "",
        name: "",
        msisdn: "",
        currentUser: [],
      };
    }
  
    componentDidMount() {
      const user = JSON.parse(localStorage.getItem("user"));
      //const user = AuthService.getCurrentUser();
      if (user) {
        this.setState({
          currentUser: user,
        });
      }
    }
  
    onChangeMobile(e) {
      this.setState({
        receiver_mobile_number: e.target.value,
      });
    }
  
    onChangeAmount(e) {
      this.setState({
        amount: e.target.value,
      });
    }
  
    onChangePin(e) {
      this.setState({
        pin: e.target.value,
      });
    }
  
    handleSend(e) {
      e.preventDefault();
  
      this.setState({
        message: [],
        recipient: "",
        mobile_number: "",
        avatar: "",
        invoice_id: "",
        successful: false,
        open: false,
      });
  
      this.form.validateAll();
  
      if (this.checkBtn.context._errors.length === 0) {
        MoneyService.sendMoney(
          this.state.receiver_mobile_number,
          this.state.amount,
          this.state.pin
        ).then(
          (response) => {
            this.setState({
              message: response.data.messages,
              recipient: response.data.data.summary.recipient.name,
              mobile_number: response.data.data.summary.recipient.mobile_number,
              avatar: response.data.data.summary.recipient.avatar,
              invoice_id: response.data.data.summary.invoice_id,
              successful: true,
              open: true,
            });
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
  
            this.setState({
              successful: false,
              message: resMessage,
            });
          }
        );
      }
    }
  
    handleClose(e) {
      e.preventDefault();
  
      this.setState({
        open: false,
      });
    }
  
    handleClose2(e) {
      e.preventDefault();
  
      this.setState({
        open2: false,
      });
    }
  
    handleViewInvoice(e, id) {
      e.preventDefault();
  
      this.setState({
        transaction_id: "",
        open2: false,
        date: "",
        transaction_type: "",
        transaction_amount: "",
        transaction_fee: "",
        total_deduction: "",
        title: "",
        name: "",
        msisdn: "",
        avatar: "",
      });
  
      // setOpen(true);
      axios
        .get(
          `https://revamp.fast-pay.cash/api/v1/private/user/transaction/invoice?invoice_id=${id}`,
          { headers: authHeader() }
        )
        .then((response) => {
          this.setState({
            open2: true,
            transaction_id: response.data.data.transaction_id,
            date: response.data.data.date,
            transaction_type: response.data.data.transaction_type,
            transaction_amount: response.data.data.transaction_amount,
            transaction_fee: response.data.data.transaction_fee,
            total_deduction: response.data.data.total_deduction,
            title: response.data.data.recipient.title,
            name: response.data.data.recipient.name,
            msisdn: response.data.data.recipient.msisdn,
            avatar: response.data.data.recipient.avatar,
          });
        });
    }
  
    render() {
      const { currentUser } = this.state;
  
      return (
        <React.Fragment>
        {!currentUser ? (
          <Redirect from="/" to="/login" />
        ) : (
            <div>
            <Navbar />
            <div className="bg-primary">
    <div className="container d-flex justify-content-center">
      <ul className="nav secondary-nav">
        <li className="nav-item"> <a className="nav-link active" href="send-money.html">Send</a></li>
        <li className="nav-item"> <a className="nav-link" href="request-money.html">Request</a></li>
      </ul>
    </div>
  </div>


  <div id="content" className="py-4">
  
    <div className="container"> 
      

      <div className="row mt-4 mb-5">
        <div className="col-lg-11 mx-auto">
          <div className="row widget-steps">
            <div className="col-4 step active">
              <div className="step-name">Details</div>
              <div className="progress">
                <div className="progress-bar"></div>
              </div>
              <a href="#" className="step-dot"></a> </div>
            <div className="col-4 step disabled">
              <div className="step-name">Confirm</div>
              <div className="progress">
                <div className="progress-bar"></div>
              </div>
              <a href="#" className="step-dot"></a> </div>
            <div className="col-4 step disabled">
              <div className="step-name">Success</div>
              <div className="progress">
                <div className="progress-bar"></div>
              </div>
              <a href="#" className="step-dot"></a> </div>
          </div>
        </div>
      </div>
      <h2 className="font-weight-400 text-center mt-3">Send Money</h2>
      <p className="lead text-center mb-4">Send your money on anytime, anywhere in the world.</p>
      <div className="row">
        <div className="col-md-9 col-lg-7 col-xl-6 mx-auto">
          <div className="bg-white shadow-sm rounded p-3 pt-sm-4 pb-sm-5 px-sm-5 mb-4">
            <h3 className="text-5 font-weight-400 mb-3 mb-sm-4">Personal Details</h3>
            <hr className="mx-n3 mx-sm-n5 mb-4" />
      
      
            <Form
            id="form-send-money"
                onSubmit={this.handleSend}
                ref={(c) => {
                  this.form = c;
                }}
              >
                 {!this.state.successful && (
                     <div>
              <div className="form-group">
                <label for="receiver_mobile_number">Recipient</label>
                <Input
                              type="text"
                              placeholder="Enter Mobile Number"
                              required
                              name="receiver_mobile_number"
                              className="form-control"
                              value={this.state.receiver_mobile_number}
                              onChange={this.onChangeMobile}
                              required
                              validations={[required]}
                              data-bv-field="receiver_mobile_number"
                              id="receiver_mobile_number"
                            />
              </div>
              <div className="form-group">
                <label for="amount">You Send</label>
                <div className="input-group">
                  <div className="input-group-prepend"> <span className="input-group-text">$</span> </div>
                  <Input
                              type="number"
                              placeholder="Amount*"
                              required
                              name="amount"
                              className="form-control"
                              value={this.state.amount}
                              onChange={this.onChangeAmount}
                              validations={[required]}
                              data-bv-field="amount"
                              id="amount"
                            />
                  <div className="input-group-append"> <span className="input-group-text p-0">
                    <select id="youSendCurrency" data-style="custom-select bg-transparent border-0" data-container="body" data-live-search="true" className="selectpicker form-control bg-transparent" required="">
                      <optgroup label="Popular Currency">
                      <option data-icon="currency-flag currency-flag-usd mr-1" data-subtext="United States dollar" selected="selected" value="">USD</option>
                      <option data-icon="currency-flag currency-flag-aud mr-1" data-subtext="Australian dollar" value="">AUD</option>
                      <option data-icon="currency-flag currency-flag-inr mr-1" data-subtext="Indian rupee" value="">INR</option>
                      </optgroup>
                      <option value="" data-divider="true">divider</option>
                      <optgroup label="Other Currency">
                      <option data-icon="currency-flag currency-flag-aed mr-1" data-subtext="United Arab Emirates dirham" value="">AED</option>
                      <option data-icon="currency-flag currency-flag-ars mr-1" data-subtext="Argentine peso" value="">ARS</option>
                      <option data-icon="currency-flag currency-flag-aud mr-1" data-subtext="Australian dollar" value="">AUD</option>
                      <option data-icon="currency-flag currency-flag-bdt mr-1" data-subtext="Bangladeshi taka" value="">BDT</option>
                      <option data-icon="currency-flag currency-flag-bgn mr-1" data-subtext="Bulgarian lev" value="">BGN</option>
                      <option data-icon="currency-flag currency-flag-brl mr-1" data-subtext="Brazilian real" value="">BRL</option>
                      <option data-icon="currency-flag currency-flag-cad mr-1" data-subtext="Canadian dollar" value="">CAD</option>
                      <option data-icon="currency-flag currency-flag-chf mr-1" data-subtext="Swiss franc" value="">CHF</option>
                      <option data-icon="currency-flag currency-flag-clp mr-1" data-subtext="Chilean peso" value="">CLP</option>
                      <option data-icon="currency-flag currency-flag-cny mr-1" data-subtext="Chinese yuan" value="">CNY</option>
                      <option data-icon="currency-flag currency-flag-czk mr-1" data-subtext="Czech koruna" value="">CZK</option>
                      <option data-icon="currency-flag currency-flag-dkk mr-1" data-subtext="Danish krone" value="">DKK</option>
                      <option data-icon="currency-flag currency-flag-egp mr-1" data-subtext="Egyptian pound" value="">EGP</option>
                      <option data-icon="currency-flag currency-flag-eur mr-1" data-subtext="Euro" value="">EUR</option>
                      <option data-icon="currency-flag currency-flag-gbp mr-1" data-subtext="British pound" value="">GBP</option>
                      <option data-icon="currency-flag currency-flag-gel mr-1" data-subtext="Georgian lari" value="">GEL</option>
                      <option data-icon="currency-flag currency-flag-ghs mr-1" data-subtext="Ghanaian cedi" value="">GHS</option>
                      <option data-icon="currency-flag currency-flag-hkd mr-1" data-subtext="Hong Kong dollar" value="">HKD</option>
                      <option data-icon="currency-flag currency-flag-hrk mr-1" data-subtext="Croatian kuna" value="">HRK</option>
                      <option data-icon="currency-flag currency-flag-huf mr-1" data-subtext="Hungarian forint" value="">HUF</option>
                      <option data-icon="currency-flag currency-flag-idr mr-1" data-subtext="Indonesian rupiah" value="">IDR</option>
                      <option data-icon="currency-flag currency-flag-ils mr-1" data-subtext="Israeli shekel" value="">ILS</option>
                      <option data-icon="currency-flag currency-flag-inr mr-1" data-subtext="Indian rupee" value="">INR</option>
                      <option data-icon="currency-flag currency-flag-jpy mr-1" data-subtext="Japanese yen" value="">JPY</option>
                      <option data-icon="currency-flag currency-flag-kes mr-1" data-subtext="Kenyan shilling" value="">KES</option>
                      <option data-icon="currency-flag currency-flag-krw mr-1" data-subtext="South Korean won" value="">KRW</option>
                      <option data-icon="currency-flag currency-flag-lkr mr-1" data-subtext="Sri Lankan rupee" value="">LKR</option>
                      <option data-icon="currency-flag currency-flag-mad mr-1" data-subtext="Moroccan dirham" value="">MAD</option>
                      <option data-icon="currency-flag currency-flag-mxn mr-1" data-subtext="Mexican peso" value="">MXN</option>
                      <option data-icon="currency-flag currency-flag-myr mr-1" data-subtext="Malaysian ringgit" value="">MYR</option>
                      <option data-icon="currency-flag currency-flag-ngn mr-1" data-subtext="Nigerian naira" value="">NGN</option>
                      <option data-icon="currency-flag currency-flag-nok mr-1" data-subtext="Norwegian krone" value="">NOK</option>
                      <option data-icon="currency-flag currency-flag-npr mr-1" data-subtext="Nepalese rupee" value="">NPR</option>
                      <option data-icon="currency-flag currency-flag-nzd mr-1" data-subtext="New Zealand dollar" value="">NZD</option>
                      <option data-icon="currency-flag currency-flag-pen mr-1" data-subtext="Peruvian nuevo sol" value="">PEN</option>
                      <option data-icon="currency-flag currency-flag-php mr-1" data-subtext="Philippine peso" value="">PHP</option>
                      <option data-icon="currency-flag currency-flag-pkr mr-1" data-subtext="Pakistani rupee" value="">PKR</option>
                      <option data-icon="currency-flag currency-flag-pln mr-1" data-subtext="Polish złoty" value="">PLN</option>
                      <option data-icon="currency-flag currency-flag-ron mr-1" data-subtext="Romanian leu" value="">RON</option>
                      <option data-icon="currency-flag currency-flag-rub mr-1" data-subtext="Russian rouble" value="">RUB</option>
                      <option data-icon="currency-flag currency-flag-sek mr-1" data-subtext="Swedish krona" value="">SEK</option>
                      <option data-icon="currency-flag currency-flag-sgd mr-1" data-subtext="Singapore dollar" value="">SGD</option>
                      <option data-icon="currency-flag currency-flag-thb mr-1" data-subtext="Thai baht" value="">THB</option>
                      <option data-icon="currency-flag currency-flag-try mr-1" data-subtext="Turkish lira" value="">TRY</option>
                      <option data-icon="currency-flag currency-flag-uah mr-1" data-subtext="Ukrainian hryvnia" value="">UAH</option>
                      <option data-icon="currency-flag currency-flag-ugx mr-1" data-subtext="Ugandan shilling" value="">UGX</option>
                      <option data-icon="currency-flag currency-flag-vnd mr-1" data-subtext="Vietnamese dong" value="">VND</option>
                      <option data-icon="currency-flag currency-flag-zar mr-1" data-subtext="South African rand" value="">ZAR</option>
                      </optgroup>
                    </select>
                    </span> </div>
                </div>
          
              </div>
         

              <p className="text-muted text-center">The current exchange rate is <span className="font-weight-500">1 USD = 1.42030 AUD</span></p>
              <hr />
              <p>Total Fees <span className="float-right">7.21 USD</span></p>
              <hr />
              <p className="text-4 font-weight-500">Total To Pay<span className="float-right">1,000.00 USD</span></p>
              <button className="btn btn-primary btn-block">Continue</button>
               
              </div>
                )}
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
  
            </div>
         )}
        </React.Fragment>
       );}}