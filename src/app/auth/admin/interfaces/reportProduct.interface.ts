export interface ReportProduct {
  timeStamp: Date;
  statusCode: number;
  status: string;
  message: string;
  data?: Data;
}

export interface Data {
  report: Report[];
}

export interface Report {
  idProduct: number;
  name: string;
  amount: number;
  total: number;
}
