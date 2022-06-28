import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Company, CompanyInfo } from '../interfaces/company.interface';
import { ListCompanies } from '../interfaces/listCompany.interface';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private _urlBackendApi: string = environment.urlBackendApi;

  constructor(private http: HttpClient) {}

  getCompanyInfo() {
    return this.http.get<ListCompanies>(`${this._urlBackendApi}/company`);
  }

  updateCompanyInfo(editCompany: Company, logoImage: File | null) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}` || ''
    );
    const payload = new FormData();
    payload.append('request', JSON.stringify(editCompany));
    if (logoImage != null) {
      payload.append('logoImage', logoImage);
    }
    return this.http.put<CompanyInfo>(
      `${this._urlBackendApi}/company/${editCompany.idCompany}`,
      payload,
      { headers }
    );
  }

  createCompanyInfo(newCompany: Company, logoImage: File | null) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}` || ''
    );
    const payload = new FormData();
    payload.append('request', JSON.stringify(newCompany));
    if (logoImage != null) {
      payload.append('logoImage', logoImage);
    }
    return this.http.post<CompanyInfo>(
      `${this._urlBackendApi}/company/`,
      payload,
      { headers }
    );
  }
}
