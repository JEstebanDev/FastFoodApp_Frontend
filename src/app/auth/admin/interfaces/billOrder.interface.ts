import { OrdersDTO, PayMode, UserForBill } from './bill.interface';

export interface BillOrderInterface {
  timeStamp: Date;
  statusCode: number;
  status: string;
  message: string;
  data: Data;
}

export interface Data {
  bill: Bill[];
}

export interface Bill {
  billUserDTO: BillUserDTO;
  ordersDTO: OrdersDTO[];
}

export interface BillUserDTO {
  idBill: number;
  referenceTransaction: string | null;
  date: Date;
  noTable: number;
  totalPrice: number;
  statusBill: string;
  payMode: PayMode;
  userForBill: UserForBill;
}
