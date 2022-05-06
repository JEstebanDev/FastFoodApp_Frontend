import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BillInterface } from '../interfaces/bill.interface';
import { Onebill } from '../interfaces/onebill.interface';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  private _urlBackendApi: string = environment.urlBackendApi;

  constructor(private http: HttpClient) {}

  getListBills(
    idUser: string,
    statusBill: string,
    startDate: Date,
    endDate: Date
  ) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}` || ''
    );
    let payload = this.validateParams(idUser, statusBill, startDate, endDate);
    return this.http.get<BillInterface>(
      `${this._urlBackendApi}/bill/list?${payload}`,
      {
        headers,
      }
    );
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
    idUser: string,
    statusBill: string,
    startDate: Date,
    endDate: Date
  ) {
    let valueParams = '';
    if (idUser != null) {
      if (idUser.length > 0) {
        valueParams += new HttpParams().append('idUser', idUser);
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
            .set('startDate', startDate.toString())
            .set('endDate', endDate.toString());
      }
    }
    return valueParams;
  }
}
