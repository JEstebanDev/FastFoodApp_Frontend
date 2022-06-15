export interface ReportPayMode {
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
  idPayMode: number;
  name: string;
  quantity: number;
}
