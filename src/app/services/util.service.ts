import { Injectable } from '@angular/core';
import CryptoJS from 'crypto-js';
import { HttpClient } from '@angular/common/http';
import { User } from '../shared/User';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UtilService {
  baseUrl = 'https://marketplacev1.herokuapp.com';
  constructor(private http: HttpClient) {}
  getFromLocalStorage(key) {
    const data = localStorage.getItem(key);
    if (data) {
      return this.decryptData(data);
    }
    return null;
  }
  encryptData(data = '') {
    const KEY = 'DISPUTEMANAGE@BEHDUE@';
    return CryptoJS.AES.encrypt(data, KEY);
  }
  decryptData(encryptedData = '') {
    const KEY = 'DISPUTEMANAGE@BEHDUE@';
    const decrypted = CryptoJS.AES.decrypt(encryptedData, KEY);

    return decrypted.toString(CryptoJS.enc.Utf8);
  }
  setLocalStorage(data = '', key) {
    const encryptedData = this.encryptData(data);
    localStorage.setItem(key, encryptedData);
  }
  registerAccount(user: User): Observable<any> {
    return this.http.post(this.baseUrl + '/api/v1/auth/signup', user);
  }
  verifyOtp(params: { email: string; otp: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/v1/auth/confirm-otp`, params);
  }
}
