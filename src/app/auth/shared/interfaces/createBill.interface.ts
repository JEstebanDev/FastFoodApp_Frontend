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
  referenceTransaction: string | null;
  date: Date;
  noTable: number;
  totalPrice: number;
  statusBill: string;
  payMode: PayMode;
  userForBill: UserForBill;
}

export interface PayMode {
  idPayMode: number;
  name: string | null;
  status: string | null;
}

export interface UserForBill {
  idUser: number;
  urlImage: string | null;
  username: string | null;
  name: string | null;
}
