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
    idProduct: number | null,
    limit: number | null,
    startDate: string | null,
    endDate: string | null
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
    if (startDate != null && endDate != null) {
      valueParams +=
        '&' +
        new HttpParams()
          .append('startDate', startDate)
          .append('endDate', endDate);
    }
    return this.http.get<ReportProduct>(
      `${this._urlBackendApi}/report/product/?${valueParams}`,
      { headers }
    );
  }

  getClient(username: string, startDate: string, endDate: string) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}` || ''
    );
    let valueParams = '';
    valueParams += new HttpParams().append('idProduct', username);
    if (startDate != null && endDate != null) {
      valueParams +=
        '&' +
        new HttpParams()
          .append('startDate', startDate)
          .append('endDate', endDate);
    }
    return this.http.get<ReportClient>(
      `${this._urlBackendApi}/report/client/?${valueParams}`,
      { headers }
    );
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

  getQuatityPayMode(startDate: string, endDate: string) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}` || ''
    );

    let valueParams = new HttpParams()
      .append('startDate', startDate)
      .append('endDate', endDate);

    return this.http.get<ReportPayMode>(
      `${this._urlBackendApi}/report/paymode/?${valueParams}`,
      { headers }
    );
  }
}
