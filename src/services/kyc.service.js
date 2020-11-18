import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://revamp.fast-pay.cash/api/v1/private/kyc/';

class KycService {
  
    getKyc() {
    return axios.get(API_URL + 'verification-documents', { headers: authHeader() });
  } 
 
}

export default new KycService();
