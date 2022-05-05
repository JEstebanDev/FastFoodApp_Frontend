import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  Category,
  CategoryInterface,
  ListCategoryInterface,
} from '../interfaces/category.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private _urlBackendApi: string = environment.urlBackendApi;

  constructor(private http: HttpClient) {}

  getCategories(): Observable<ListCategoryInterface> {
    return this.http.get<ListCategoryInterface>(
      `${this._urlBackendApi}/category/list`
    );
  }

  createCategory(newCategory: Category) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}` || ''
    );
    const strNewProduct = JSON.stringify(newCategory);
    const payload = new HttpParams().set('request', strNewProduct);
    return this.http.post<CategoryInterface>(
      `${this._urlBackendApi}/category/`,
      payload,
      { headers }
    );
  }

  updateCategory(editCategory: Category, idCategory: number) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}` || ''
    );
    const strNewProduct = JSON.stringify(editCategory);
    const payload = new HttpParams().set('request', strNewProduct);
    return this.http.put<CategoryInterface>(
      `${this._urlBackendApi}/category/${idCategory}`,
      payload,
      { headers }
    );
  }

  deleteCategory(idCategory: number) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}` || ''
    );
    return this.http.delete<CategoryInterface>(
      `${this._urlBackendApi}/category/${idCategory}`,
      { headers }
    );
  }
}
