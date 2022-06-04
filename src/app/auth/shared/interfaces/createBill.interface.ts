export interface CreateBillResponse {
  timeStamp: Date;
  statusCode?: number;
  status: string;
  message?: string;
  data?: Data;
}

export interface Data {
  bill: Bill;
}

export interface Bill {
  idBill: number;
  idTransaction: null;
  date: Date;
  noTable: number;
  totalPrice: number;
  statusBill: string;
  payMode: PayMode;
  userForBill: UserForBill;
}

export interface PayMode {
  idPayMode: number;
  name: null;
  status: null;
}

export interface UserForBill {
  idUser: number;
  urlImage: null;
  username: null;
  name: null;
}
