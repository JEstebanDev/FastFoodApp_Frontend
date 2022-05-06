import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  Additional,
  AdditionalInterface,
} from '../interfaces/additional.interface';
import { ProductInterface } from '../interfaces/products.interface';

@Injectable({
  providedIn: 'root',
})
export class AdditionalService {
  private _urlBackendApi: string = environment.urlBackendApi;

  constructor(private http: HttpClient) {}

  getListAdditionals() {
    return this.http.get<AdditionalInterface>(
      `${this._urlBackendApi}/additional/list`
    );
  }

  getCategories(): Observable<ProductInterface> {
    return this.http.get<ProductInterface>(
      `${this._urlBackendApi}/category/list`
    );
  }

  createAdditional(newAdditional: Additional) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}` || ''
    );
    const strNewAdditional = JSON.stringify(newAdditional);
    const payload = new HttpParams().set('request', strNewAdditional);
    return this.http.post<ProductInterface>(
      `${this._urlBackendApi}/additional/`,
      payload,
      { headers }
    );
  }

  editAdditional(editAdditional: Additional, idAdditional: number) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}` || ''
    );
    const strEditAdditional = JSON.stringify(editAdditional);
    const payload = new HttpParams().set('request', strEditAdditional);
    return this.http.put<ProductInterface>(
      `${this._urlBackendApi}/additional/${idAdditional}`,
      payload,
      { headers }
    );
  }

  deleteAdditional(idAdditional: number) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}` || ''
    );
    return this.http.delete<AdditionalInterface>(
      `${this._urlBackendApi}/additional/${idAdditional}`,
      { headers }
    );
  }
}
