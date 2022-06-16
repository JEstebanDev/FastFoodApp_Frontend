export interface UpdateBill {
  date: Date;
  payMode: PayMode;
  noTable: number;
  statusBill: string;
}

export interface PayMode {
  idPayMode: number;
}

export interface User {
  idUser: number;
}
