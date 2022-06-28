export interface CompanyInfo {
  timeStamp: Date;
  statusCode: number;
  status: string;
  message: string;
  data: Data;
}

export interface Data {
  company: Company;
}

export interface Company {
  idCompany: number;
  name: string;
  urlImage: string | null;
  nitCode: string;
  region: string;
  city: string;
  address: string;
  managerName: string;
  phone: number;
  status: string;
}
