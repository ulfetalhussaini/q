import axios from 'axios';
import authHeader from './auth-header';

const Base_URL = 'https://revamp.fast-pay.cash/';
const APIsendmony_URL = 'api/v1/private/transaction/send-money/';
const APIdepositmoney_URL = 'api/v1/private/transaction/deposit/via-fastlink/';
const APIwithdrawmoney_URL = 'api/v1/private/transaction/cash-out/via-agent/';
const APIrecievemoney_URL = 'api/v1/private/transaction/request-money/';
const APIbundlepurchase_URL = 'api/v1/private/transaction/bundle-purchase/';

class MoneyService {
  
    sendMoneySummary(receiver_mobile_number, amount) {
        return axios.post(Base_URL + APIsendmony_URL + "summary", {
            receiver_mobile_number,
            amount,
        }, { headers: authHeader() });
      }

      sendMoney(receiver_mobile_number, amount, pin) {
        return axios.post(Base_URL + APIsendmony_URL + "execute", {
            receiver_mobile_number,
            amount,
            pin
        }, { headers: authHeader() });
      }

      recentSendMoney() {
        return axios.get(Base_URL + APIsendmony_URL + 'recent-recipients', { headers: authHeader() });
      } 

      receiveMoney(requestee_mobile_number, amount, pin) {
        return axios.post(Base_URL + APIrecievemoney_URL + "execute", {
            requestee_mobile_number,
            amount,
            pin
        }, { headers: authHeader() });
      }

      recentreceiveMoney() {
        return axios.get(Base_URL + APIrecievemoney_URL + 'recent-recipients', { headers: authHeader() });
      } 

      depositMoney(card_number) {
        return axios.post(Base_URL + APIdepositmoney_URL + "execute", {
            card_number,
        }, { headers: authHeader() });
      }
  
      withdrawMoney(receiver_mobile_number, amount, pin) {
        return axios.post(Base_URL + APIwithdrawmoney_URL + "execute", {
          receiver_mobile_number,
          amount,
          pin
        }, { headers: authHeader() });
      }
 
      bundlePurchaseSummary(operator_id, bundle_id) {
        return axios.post(Base_URL + APIbundlepurchase_URL + "summary", {
            operator_id,
            bundle_id,
        }, { headers: authHeader() });
      }

      bundlePurchase(operator_id, bundle_id, pin) {
        return axios.post(Base_URL + APIbundlepurchase_URL + "execute", {
            operator_id,
            bundle_id,
            pin
        }, { headers: authHeader() });
      }
     
}

export default new MoneyService();
