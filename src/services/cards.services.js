import axios from 'axios';
import authHeader from './auth-header';

const Base_URL = 'https://revamp.fast-pay.cash/';
const APIonline_URL = 'api/v1/private/transaction/bundle-purchase/';
const APIinternet_URL = 'api/v1/private/transaction/bundle-purchase/';
const APImobile_URL = 'api/v1/private/transaction/bundle-purchase/';

class CardsService {
  
    getOnlineCards() {
    return axios.get(Base_URL + APIonline_URL + 'operators?type=OC', { headers: authHeader() });
  } 

  getInternetCards() {
    return axios.get(Base_URL + APIinternet_URL + 'operators?type=IR', { headers: authHeader() });
  } 
 
  getMobileCards() {
    return axios.get(Base_URL + APImobile_URL + 'operators?type=MR', { headers: authHeader() });
  } 

}

export default new CardsService();
