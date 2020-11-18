import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://revamp.fast-pay.cash/api/v1/private/user/';

class UserInfo {
  
  getUserInfo() {
    return axios.get(API_URL + 'basic-information', { headers: authHeader() });
  }
  
 
}

export default new UserInfo();
