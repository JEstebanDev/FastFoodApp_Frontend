export interface ReportClient {
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
  idUser: number;
  username: string;
  total: number;
}
