export interface ReportSalesMontly {
  timeStamp: Date;
  statusCode: number;
  status: string;
  message: string;
  data: Data;
}

export interface Data {
  report: Report[];
}

export interface Report {
  month: number;
  total: number;
}
