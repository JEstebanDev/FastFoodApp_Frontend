import { Bill } from './bill.interface';

export interface BillInformation {
  timeStamp: Date;
  statusCode: number;
  status: string;
  message: string;
  data: Data;
}

export interface Data {
  bill: Bill;
}
