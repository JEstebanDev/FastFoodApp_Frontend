import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ReportClient } from '../interfaces/reportClient.interface';
import { ReportPayMode } from '../interfaces/reportPayMode.interface';
import { ReportProduct } from '../interfaces/reportProduct.interface';
import { ReportSalesMontly } from '../interfaces/reportSalesMontly.interface';
import { ReportSalesWeekly } from '../interfaces/reportSalesWeekly.interface';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private _urlBackendApi: string = environment.urlBackendApi;

  constructor(private http: HttpClient) {}

  getRankProducts(
    idProduct: string | null,
    limit: string | null,
    startDate: Date | null,
    endDate: Date | null
  ) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}` || ''
    );
    let valueParams = '';
    if (idProduct != null) {
      valueParams += new HttpParams().append('idProduct', idProduct);
    }
    if (limit != null) {
      valueParams += '&' + new HttpParams().append('limit', limit);
    }
    valueParams += this.validateDate(startDate, endDate);
    return this.http.get<ReportProduct>(
      `${this._urlBackendApi}/report/product/?${valueParams}`,
      { headers }
    );
  }

  getClient(
    username: string | null,
    startDate: Date | null,
    endDate: Date | null
  ) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}` || ''
    );
    let valueParams = '';
    if (username != null) {
      valueParams += new HttpParams().append('username', username);
    }
    valueParams += this.validateDate(startDate, endDate);
    return this.http.get<ReportClient>(
      `${this._urlBackendApi}/report/client/?${valueParams}`,
      { headers }
    );
  }
  validateDate(startDate: Date | null, endDate: Date | null) {
    let valueParams = '';
    if (startDate != null && endDate != null) {
      if (startDate.toString().length > 0 && endDate.toString().length > 0) {
        valueParams +=
          '&' +
          new HttpParams()
            .append('startDate', startDate.toString() + ' 00:00:00')
            .append('endDate', endDate.toString() + ' 23:59:59');
      }
    }
    return valueParams;
  }

  getSalesMonthly() {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}` || ''
    );
    return this.http.get<ReportSalesMontly>(
      `${this._urlBackendApi}/report/salesmonthly/`,
      { headers }
    );
  }

  getSalesWeekly() {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}` || ''
    );
    return this.http.get<ReportSalesWeekly>(
      `${this._urlBackendApi}/report/salesweekly/`,
      { headers }
    );
  }

  getQuatityPayMode() {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}` || ''
    );

    return this.http.get<ReportPayMode>(
      `${this._urlBackendApi}/report/paymode/`,
      { headers }
    );
  }
}
