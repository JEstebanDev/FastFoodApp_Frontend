import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Company } from '../interfaces/company.interface';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private _urlBackendApi: string = environment.urlBackendApi;
  constructor(private http: HttpClient) {}
  getCompany() {
    return this.http.get<Company>(`${this._urlBackendApi}/company/`);
  }
}
