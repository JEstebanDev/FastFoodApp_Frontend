import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NewsLetterService {
  private _urlBackendApi: string = environment.urlBackendApi;

  constructor(private http: HttpClient) {}

  getProductsHighlight(email: string) {
    return this.http.get(`${this._urlBackendApi}/subscriber/${email}`);
  }
}
