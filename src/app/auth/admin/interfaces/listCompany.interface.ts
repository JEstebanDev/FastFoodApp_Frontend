import { Company } from './company.interface';

export interface ListCompanies {
  timeStamp: Date;
  statusCode: number;
  status: string;
  message: string;
  data: Data;
}

export interface Data {
  company: Company[];
}
