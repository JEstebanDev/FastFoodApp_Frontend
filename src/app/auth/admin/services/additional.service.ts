import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  Additional,
  AdditionalInterface,
} from '../interfaces/additional.interface';
import { ListAdditionalInterface } from '../interfaces/listAdditional.interface';
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

  getAdditionalsByName(nameAdditional: string) {
    return this.http.get<ListAdditionalInterface>(
      `${this._urlBackendApi}/additional/${nameAdditional}`
    );
  }

  getCategories(): Observable<ProductInterface> {
    return this.http.get<ProductInterface>(
      `${this._urlBackendApi}/category/list`
    );
  }

  createAdditional(newAdditional: Additional, additionalImage: File | null) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}` || ''
    );
    const payload = new FormData();
    payload.append('request', JSON.stringify(newAdditional));
    if (additionalImage != null) {
      payload.append('additionalImage', additionalImage);
    }
    return this.http.post<ProductInterface>(
      `${this._urlBackendApi}/additional/`,
      payload,
      { headers }
    );
  }

  editAdditional(
    editAdditional: Additional,
    idAdditional: number,
    additionalImage: File | null
  ) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}` || ''
    );
    const payload = new FormData();
    payload.append('request', JSON.stringify(editAdditional));
    if (additionalImage != null) {
      payload.append('additionalImage', additionalImage);
    }
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
