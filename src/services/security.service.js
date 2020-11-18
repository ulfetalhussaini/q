import axios from 'axios';
import authHeader from './auth-header';

const Base_URL = "https://revamp.fast-pay.cash/";
const APIchangePass_URL = "api/v1/auth/change-password/";
const APIchangePin_URL = "api/v1/auth/pin-change/";
const APIforgotPass_URL = "api/v1/auth/forgot-password/";

class SecurityService {
  
    changePassword(old_password, password, password_confirmation) {
        return axios.post(Base_URL + APIchangePass_URL + "step-1", {
          old_password,
          password,
          password_confirmation
        }, { headers: authHeader() });
      }

      confirmPassword(old_password, password, password_confirmation, otp) {
        return axios.post(Base_URL + APIchangePass_URL + "step-2", {
          old_password,
          password,
          password_confirmation,
          otp
        }, { headers: authHeader() });
      }

      changePin(old_pin, pin, pin_confirmation) {
        return axios.post(Base_URL + APIchangePin_URL + "step-1", {
          old_pin,
          pin,
          pin_confirmation
        }, { headers: authHeader() });
      }

      confirmPin(old_pin, pin, pin_confirmation, otp) {
        return axios.post(Base_URL + APIchangePin_URL + "step-2", {
          old_pin,
          pin,
          pin_confirmation,
          otp
        }, { headers: authHeader() });
      }

      forgotPass(email) {
        return axios.post(Base_URL + APIforgotPass_URL + "send-otp", {
          email
        }, { headers: authHeader() });
      }

      forgotConfirmPass(email, otp) {
        return axios.post(Base_URL + APIforgotPass_URL + "verify-otp", {
          email,
          otp
        }, { headers: authHeader() });
      }

      resetPass(email, otp, password, password_confirmation) {
        return axios.post(Base_URL + APIforgotPass_URL + "reset", {
          email,
          otp,
          password,
          password_confirmation
        }, { headers: authHeader() });
      }
     
}

export default new SecurityService();
