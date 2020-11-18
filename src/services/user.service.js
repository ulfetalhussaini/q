import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://revamp.fast-pay.cash/api/v1/private/user/';

class UserService {
  
  getUserBoard() {
    return axios.get(API_URL + 'profile', { headers: authHeader() });
  }

  putUserBoard(full_name, surname, date_of_birth, country_id, state_id, address_line1) {
    return axios.put(API_URL + 'profile-update',
     { full_name, surname, date_of_birth, country_id, state_id, address_line1 }, { headers: authHeader() });
  }

  getUserBasicInfo() {
    return axios.get(API_URL + 'basic-information', { headers: authHeader() });
  }
  
  getNotifications() {
    return axios.get(API_URL + 'notifications', { headers: authHeader() });
  }
 
}

export default new UserService();
