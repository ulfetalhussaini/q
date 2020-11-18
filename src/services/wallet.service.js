import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://revamp.fast-pay.cash/api/v1/private/user/transaction/';

class TransactionService {
  
    getTransactions() {
    return axios.get(API_URL + 'history', { headers: authHeader() });
  } 
 
}

export default new TransactionService();
