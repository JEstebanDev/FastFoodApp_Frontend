import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AdditionalInterface } from '../interfaces/additional.interface';
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
}
