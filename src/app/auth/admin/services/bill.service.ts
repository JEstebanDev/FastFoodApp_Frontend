import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TokenBill } from '../../shared/interfaces/tokenBill.interface';
import { BillInterface } from '../interfaces/bill.interface';
import { BillUpdate } from '../interfaces/billUpdate.interface';
import { Onebill } from '../interfaces/onebill.interface';
import { UpdateBill } from '../interfaces/updateBill.interface';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  private _urlBackendApi: string = environment.urlBackendApi;

  constructor(private http: HttpClient) {}

  getListBills(
    username: string,
    statusBill: string,
    startDate: Date,
    endDate: Date,
    page: number
  ) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}` || ''
    );
    let payload = this.validateParams(
      username,
      statusBill,
      startDate,
      endDate,
      page
    );
    return this.http.get<BillInterface>(
      `${this._urlBackendApi}/bill/list?${payload}`,
      {
        headers,
      }
    );
  }

  updateBill(idBill: number, updateBill: UpdateBill) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}` || ''
    );
    return this.http.put<BillUpdate>(
      `${this._urlBackendApi}/bill/${idBill}`,
      updateBill,
      { headers }
    );
  }

  updateStatusBill(idBill: number, statusBill: string) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}` || ''
    );
    const payload = new HttpParams().set('statusBill', statusBill);
    return this.http.get<BillUpdate>(
      `${this._urlBackendApi}/bill/status/${idBill}?${payload}`,
      {
        headers,
      }
    );
  }

  updateStatusBillWompi(idBill: number, referenceTransaction: string) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}` || ''
    );
    const payload = new HttpParams().set(
      'referenceTransaction',
      referenceTransaction
    );
    return this.http.get<BillUpdate>(
      `${this._urlBackendApi}/bill/cancel-transaction/${idBill}?${payload}`,
      {
        headers,
      }
    );
  }

  getTokenBill(idBill: number) {
    return this.http.get<TokenBill>(
      `${this._urlBackendApi}/token-refresh/unattributed/${idBill}`
    );
  }

  checkTransaction(idBill: number) {
    return this.http.get(`${this._urlBackendApi}/bill/transaction/${idBill}`);
  }

  getDetailsBill(idBill: string) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}` || ''
    );
    return this.http.get<Onebill>(
      `${this._urlBackendApi}/bill/list?idBill=${idBill}`,
      {
        headers,
      }
    );
  }

  validateParams(
    username: string,
    statusBill: string,
    startDate: Date,
    endDate: Date,
    page: number
  ) {
    let valueParams = '';
    if (username != null) {
      if (username.length > 0) {
        valueParams += new HttpParams().append('username', username);
      }
    }
    if (statusBill != 'DEFAULT') {
      valueParams += '&' + new HttpParams().set('statusBill', statusBill);
    }
    if (startDate != null && endDate != null) {
      if (startDate.toString().length > 0 && endDate.toString().length > 0) {
        valueParams +=
          '&' +
          new HttpParams()
            .set('startDate', startDate.toString() + ' 00:00:00')
            .set('endDate', endDate.toString() + ' 23:59:59');
      }
    }
    if (page < 0) {
      valueParams += '&' + new HttpParams().append('page', 0);
    } else {
      valueParams += '&' + new HttpParams().append('page', page);
    }
    return valueParams;
  }
}
