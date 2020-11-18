import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AuthService from "../services/auth.service";
import authHeader from "../services/auth-header";
import { Redirect } from "react-router-dom";
import TransactionService from "../services/wallet.service";
import axios from "axios";
import Navbar from "../components/Navbar";


export default function Transactions() {

    const [order, setOrder] = React.useState("desc");
    const [orderBy, setOrderBy] = React.useState("created_at");
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    // const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    
const [userTransactions, setUserTransaction] = useState([]);
  const [userReady, setUserReady] = React.useState(false);
  const [redirect, setRedirect] = React.useState(null);
  const [currentUser, setCurrentUser] = useState([]);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }

    TransactionService.getTransactions().then(
      (response) => {
        setUserTransaction(response.data.data.transactions);
        setUserReady(true);
        console.log(response.data.data.transactions)
      },
      (error) => {
        if (
          userTransactions === error.response ||
          error.response.data ||
          error.response.data.message ||
          error.message ||
          error.toString()
        ) {
          setUserReady(false);
          setRedirect("/login");
        }
      }
    );
  }, [userTransactions]);

//   const handleRequestSort = (event, property) => {
//     const isAsc = orderBy === property && order === "asc";
//     setOrder(isAsc ? "desc" : "asc");
//     setOrderBy(property);
//   };

//   const handleSelectAllClick = (event) => {
//     if (event.target.checked) {
//       const newSelecteds = userTransactions.map((n) => n.transaction_id);
//       setSelected(newSelecteds);
//       return;
//     }
//     setSelected([]);
//   };


//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };


//   const isSelected = (transaction_id) =>
//     selected.indexOf(transaction_id) !== -1;

//   const emptyRows =
//     rowsPerPage -
//     Math.min(rowsPerPage, userTransactions.length - page * rowsPerPage);

  //const modelclasses = useModelStyles();

  const [open, setOpen] = React.useState(false);

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  const [userTrans, setUserTrans] = useState("");

  const handleSubmitModel = (event, transaction_id) => {
    event.preventDefault();
    setOpen(true);

    axios
      .get(
        `https://revamp.fast-pay.cash/api/v1/private/user/transaction/invoice?invoice_id=${transaction_id}`,
        { headers: authHeader() }
      )
      .then(
        (response) => {
          setUserTrans(response.data.data);
        },
        [userTrans]
      );
  };


    return(
        <React.Fragment>
        {currentUser ? (
            <div>
         <Navbar />
        <div className="col-lg-9">
        <h2 className="font-weight-400 mb-3">Transactions</h2>
        
      
        <div className="row">
          <div className="col mb-2">
            <form id="filterTransactions" method="post">
              <div className="form-row"> 
             
                <div className="col-sm-6 col-md-5 form-group">
                  <input id="dateRange" type="text" className="form-control" placeholder="Date Range" />
                  <span className="icon-inside"><i className="fas fa-calendar-alt"></i></span> </div>
              
                <div className="col-auto d-flex align-items-center mr-auto form-group" data-toggle="collapse"> <a className="btn-link" data-toggle="collapse" href="#allFilters" aria-expanded="false" aria-controls="allFilters">All Filters<i className="fas fa-sliders-h text-3 ml-1"></i></a> </div>
              
                <div className="col-auto d-flex align-items-center ml-auto form-group">
                  <div className="dropdown"> <a className="text-muted btn-link" href="#" role="button" id="statements" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fas fa-file-download text-3 mr-1"></i>Statements</a>
                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="statements"> <a className="dropdown-item" href="#">CSV</a> <a className="dropdown-item" href="#">PDF</a> </div>
                  </div>
                </div>
  
                <div className="col-12 collapse mb-3" id="allFilters">
                  <div className="custom-control custom-radio custom-control-inline">
                    <input type="radio" id="allTransactions" name="allFilters" className="custom-control-input" checked />
                    <label className="custom-control-label" htmlFor="allTransactions">All Transactions</label>
                  </div>
                  <div className="custom-control custom-radio custom-control-inline">
                    <input type="radio" id="paymentsSend" name="allFilters" className="custom-control-input" />
                    <label className="custom-control-label" htmlFor="paymentsSend">Payments Send</label>
                  </div>
                  <div className="custom-control custom-radio custom-control-inline">
                    <input type="radio" id="paymentsReceived" name="allFilters" className="custom-control-input" />
                    <label className="custom-control-label" htmlFor="paymentsReceived">Payments Received</label>
                  </div>
                  <div className="custom-control custom-radio custom-control-inline">
                    <input type="radio" id="refunds" name="allFilters" className="custom-control-input" />
                    <label className="custom-control-label" htmlFor="refunds">Refunds</label>
                  </div>
                  <div className="custom-control custom-radio custom-control-inline">
                    <input type="radio" id="withdrawal" name="allFilters" className="custom-control-input" />
                    <label className="custom-control-label" htmlFor="withdrawal">Withdrawal</label>
                  </div>
                  <div className="custom-control custom-radio custom-control-inline">
                    <input type="radio" id="deposit" name="allFilters" className="custom-control-input" />
                    <label className="custom-control-label" htmlFor="deposit">Deposit</label>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      
        <div className="bg-white shadow-sm rounded py-4 mb-4">
          <h3 className="text-5 font-weight-400 d-flex align-items-center px-4 mb-4">All Transactions</h3>
      
      
          <div className="transaction-title py-2 px-4">
            <div className="row">
              <div className="col-2 col-sm-1 text-center"><span className="">Date</span></div>
              <div className="col col-sm-1">Transaction Type</div>
              <div className="col col-sm-1">Transaction Id</div>
              <div className="col-3 col-sm-2 text-right">Amount</div>
              <div className="col col-sm-1">Source (Name)</div>
              <div className="col col-sm-1">Source (Mobile No.)</div>
              <div className="col col-sm-1">Destination (Name)</div>
              <div className="col col-sm-1">Destination (Mobile No.)</div>
              
              {/* <div className="col-auto col-sm-1 d-none d-sm-block text-center">Status</div> */}
            </div>
          </div>
 
 
          <div className="transaction-list">
          {userTransactions.map((userTransaction) => {
            <div className="transaction-item px-4 py-3" data-toggle="modal" data-target="#transaction-detail">
              <div className="row align-items-center flex-row">
                <div className="col-2 col-sm-1 text-center"> <span className="d-block text-4 font-weight-300">{userTransaction.created_at}</span> </div>
                <div className="col col-sm-7"> <span className="d-block text-4">{userTransaction.transaction_id}</span> <span className="text-muted">Withdraw to Bank account</span> </div>
                <div className="col-auto col-sm-2 d-none d-sm-block text-center text-3"> <span className="text-warning" data-toggle="tooltip" data-original-title="In Progress"><i className="fas fa-ellipsis-h"></i></span> </div>
                <div className="col-3 col-sm-2 text-right text-4"> <span className="text-nowrap">- $562</span> <span className="text-2 text-uppercase">(USD)</span> </div>
              </div>
            </div>
        })}
        </div>

        <div className="transaction-list">
            <div className="transaction-item px-4 py-3" data-toggle="modal" data-target="#transaction-detail">
              <div className="row align-items-center flex-row">
                <div className="col-2 col-sm-1 text-center"> <span className="d-block text-4 font-weight-300">15</span> <span className="d-block text-1 font-weight-300 text-uppercase">APR</span> </div>
                <div className="col col-sm-7"> <span className="d-block text-4">Envato Pty Ltd</span> <span className="text-muted">Payment Received</span> </div>
                <div className="col-auto col-sm-2 d-none d-sm-block text-center text-3"> <span className="text-success" data-toggle="tooltip" data-original-title="Completed"><i className="fas fa-check-circle"></i></span> </div>
                <div className="col-3 col-sm-2 text-right text-4"> <span className="text-nowrap">+ $562</span> <span className="text-2 text-uppercase">(USD)</span> </div>
              </div>
            </div>
            <div className="transaction-item px-4 py-3" data-toggle="modal" data-target="#transaction-detail">
              <div className="row align-items-center flex-row">
                <div className="col-2 col-sm-1 text-center"> <span className="d-block text-4 font-weight-300">04</span> <span className="d-block text-1 font-weight-300 text-uppercase">APR</span> </div>
                <div className="col col-sm-7"> <span className="d-block text-4">HDFC Bank</span> <span className="text-muted">Withdraw to Bank account</span> </div>
                <div className="col-auto col-sm-2 d-none d-sm-block text-center text-3"> <span className="text-success" data-toggle="tooltip" data-original-title="Completed"><i className="fas fa-check-circle"></i></span> </div>
                <div className="col-3 col-sm-2 text-right text-4"> <span className="text-nowrap">- $106</span> <span className="text-2 text-uppercase">(USD)</span> </div>
              </div>
            </div>
            <div className="transaction-item px-4 py-3" data-toggle="modal" data-target="#transaction-detail">
              <div className="row align-items-center flex-row">
                <div className="col-2 col-sm-1 text-center"> <span className="d-block text-4 font-weight-300">28</span> <span className="d-block text-1 font-weight-300 text-uppercase">MAR</span> </div>
                <div className="col col-sm-7"> <span className="d-block text-4">Patrick Cary</span> <span className="text-muted">Refund</span> </div>
                <div className="col-auto col-sm-2 d-none d-sm-block text-center text-3"> <span className="text-success" data-toggle="tooltip" data-original-title="Completed"><i className="fas fa-check-circle"></i></span> </div>
                <div className="col-3 col-sm-2 text-right text-4"> <span className="text-nowrap">+ $60</span> <span className="text-2 text-uppercase">(USD)</span> </div>
              </div>
            </div>
            <div className="transaction-item px-4 py-3" data-toggle="modal" data-target="#transaction-detail">
              <div className="row align-items-center flex-row">
                <div className="col-2 col-sm-1 text-center"> <span className="d-block text-4 font-weight-300">28</span> <span className="d-block text-1 font-weight-300 text-uppercase">MAR</span> </div>
                <div className="col col-sm-7"> <span className="d-block text-4">Patrick Cary</span> <span className="text-muted">Payment Sent</span> </div>
                <div className="col-auto col-sm-2 d-none d-sm-block text-center text-3"> <span className="text-danger" data-toggle="tooltip" data-original-title="Cancelled"><i className="fas fa-times-circle"></i></span> </div>
                <div className="col-3 col-sm-2 text-right text-4"> <span className="text-nowrap">- $60</span> <span className="text-2 text-uppercase">(USD)</span> </div>
              </div>
            </div>
            <div className="transaction-item px-4 py-3" data-toggle="modal" data-target="#transaction-detail">
              <div className="row align-items-center flex-row">
                <div className="col-2 col-sm-1 text-center"> <span className="d-block text-4 font-weight-300">16</span> <span className="d-block text-1 font-weight-300 text-uppercase">FEB</span> </div>
                <div className="col col-sm-7"> <span className="d-block text-4">HDFC Bank</span> <span className="text-muted">Withdraw to Bank account</span> </div>
                <div className="col-auto col-sm-2 d-none d-sm-block text-center text-3"> <span className="text-success" data-toggle="tooltip" data-original-title="Completed"><i className="fas fa-check-circle"></i></span> </div>
                <div className="col-3 col-sm-2 text-right text-4"> <span className="text-nowrap">- $1498</span> <span className="text-2 text-uppercase">(USD)</span> </div>
              </div>
            </div>
            <div className="transaction-item px-4 py-3" data-toggle="modal" data-target="#transaction-detail">
              <div className="row align-items-center flex-row">
                <div className="col-2 col-sm-1 text-center"> <span className="d-block text-4 font-weight-300">15</span> <span className="d-block text-1 font-weight-300 text-uppercase">FEB</span> </div>
                <div className="col col-sm-7"> <span className="d-block text-4">Envato Pty Ltd</span> <span className="text-muted">Payment Received</span> </div>
                <div className="col-auto col-sm-2 d-none d-sm-block text-center text-3"> <span className="text-success" data-toggle="tooltip" data-original-title="Completed"><i className="fas fa-check-circle"></i></span> </div>
                <div className="col-3 col-sm-2 text-right text-4"> <span className="text-nowrap">+ $1498</span> <span className="text-2 text-uppercase">(USD)</span> </div>
              </div>
            </div>
          </div>


          <div id="transaction-detail" className="modal fade" role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered transaction-details" role="document">
              <div className="modal-content">
                <div className="modal-body">
                  <div className="row no-gutters">
                    <div className="col-sm-5 d-flex justify-content-center bg-primary rounded-left py-4">
                      <div className="my-auto text-center">
                        <div className="text-17 text-white my-3"><i className="fas fa-building"></i></div>
                        <h3 className="text-4 text-white font-weight-400 my-3">Envato Pty Ltd</h3>
                        <div className="text-8 font-weight-500 text-white my-4">$557.20</div>
                        <p className="text-white">15 March 2020</p>
                      </div>
                    </div>
                    <div className="col-sm-7">
                      <h5 className="text-5 font-weight-400 m-3">Transaction Details
                        <button type="button" className="close font-weight-400" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button>
                      </h5>
                      <hr />
                      <div className="px-3">
                        <ul className="list-unstyled">
                          <li className="mb-2">Payment Amount <span className="float-right text-3">$562.00</span></li>
                          <li className="mb-2">Fee <span className="float-right text-3">-$4.80</span></li>
                        </ul>
                        <hr className="mb-2" />
                        <p className="d-flex align-items-center font-weight-500 mb-4">Total Amount <span className="text-3 ml-auto">$557.20</span></p>
                        <ul className="list-unstyled">
                          <li className="font-weight-500">Paid By:</li>
                          <li className="text-muted">Envato Pty Ltd</li>
                        </ul>
                        <ul className="list-unstyled">
                          <li className="font-weight-500">Transaction ID:</li>
                          <li className="text-muted">26566689645685976589</li>
                        </ul>
                        <ul className="list-unstyled">
                          <li className="font-weight-500">Description:</li>
                          <li className="text-muted">Envato March 2020 Member Payment</li>
                        </ul>
                        <ul className="list-unstyled">
                          <li className="font-weight-500">Status:</li>
                          <li className="text-muted">Completed<span className="text-success text-3 ml-1"><i className="fas fa-check-circle"></i></span></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <ul className="pagination justify-content-center mt-4 mb-0">
            <li className="page-item disabled"> <a className="page-link" href="#" tabIndex="-1"><i className="fas fa-angle-left"></i></a> </li>
            <li className="page-item"><a className="page-link" href="#">1</a></li>
            <li className="page-item active"> <a className="page-link" href="#">2 <span className="sr-only">(current)</span></a> </li>
            <li className="page-item"><a className="page-link" href="#">3</a></li>
            <li className="page-item d-flex align-content-center flex-wrap text-muted text-5 mx-1">......</li>
            <li className="page-item"><a className="page-link" href="#">15</a></li>
            <li className="page-item"> <a className="page-link" href="#"><i className="fas fa-angle-right"></i></a> </li>
          </ul>
          
        </div>
      </div>
      </div>
  ) : (<Redirect from="/dashboard" to="/login" />)}

  </React.Fragment>
    )


}