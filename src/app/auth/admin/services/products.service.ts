import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product, ProductInterface } from '../interfaces/products.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private _urlBackendApi: string = environment.urlBackendApi;

  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get<ProductInterface>(
      `${this._urlBackendApi}/category/list`
    );
  }

  getProductById(idProduct: any) {
    return this.http.get<ProductInterface>(
      `${this._urlBackendApi}/product/id/${idProduct}`
    );
  }

  getProductsByCategory(category: string) {
    return this.http.get<ProductInterface>(
      `${this._urlBackendApi}/product/category/${category}`
    );
  }

  createProduct(newProduct: Product) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}` || ''
    );
    const strNewProduct = JSON.stringify(newProduct);
    const payload = new HttpParams().set('request', strNewProduct);
    return this.http.post<ProductInterface>(
      `${this._urlBackendApi}/product/`,
      payload,
      { headers }
    );
  }

  updateProduct(idProduct: number, editProduct: Product) {
    console.log('entro');
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}` || ''
    );
    const strEditProduct = JSON.stringify(editProduct);
    const payload = new HttpParams().set('request', strEditProduct);
    console.log(payload);
    return this.http.put<ProductInterface>(
      `${this._urlBackendApi}/product/${idProduct}`,
      payload,
      { headers }
    );
  }

  deleteProduct(idProduct: number) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}` || ''
    );
    return this.http.delete<ProductInterface>(
      `${this._urlBackendApi}/product/${idProduct}`,
      { headers }
    );
  }
}
