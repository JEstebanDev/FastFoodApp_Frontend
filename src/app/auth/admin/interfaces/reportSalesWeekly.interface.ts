export interface ReportSalesWeekly {
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
  weekday: number;
  total: number;
}
