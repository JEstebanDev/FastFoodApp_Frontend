import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductInterface } from '../../admin/interfaces/products.interface';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private _urlBackendApi: string = environment.urlBackendApi;

  constructor(private http: HttpClient) {}

  getProductsHighlight() {
    return this.http.get<ProductInterface>(
      `${this._urlBackendApi}/product/highlight`
    );
  }
}
