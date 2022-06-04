export interface Company {
  timeStamp: Date;
  statusCode: number;
  status: string;
  message: string;
  data: Data;
}

export interface Data {
  company: CompanyElement[];
}

export interface CompanyElement {
  idCompany: number;
  name: string;
  urlImage: null;
  nitCode: string;
  region: string;
  city: string;
  address: string;
  managerName: string;
  phone: number;
  status: string;
}
