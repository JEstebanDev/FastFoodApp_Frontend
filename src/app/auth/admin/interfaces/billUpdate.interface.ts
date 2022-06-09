import { BillUserDTO } from './bill.interface';

export interface BillUpdate {
  timeStamp: Date;
  statusCode: number;
  status: string;
  message: string;
  data?: Data;
}

export interface Data {
  bill: BillUserDTO;
}
