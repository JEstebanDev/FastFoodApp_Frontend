export interface CreateBillParams {
  date: Date;
  user?: User;
  payMode: PayMode;
  noTable: number;
  referenceTransaction?: string;
}

export interface PayMode {
  idPayMode: number;
}

export interface User {
  idUser: number;
}
