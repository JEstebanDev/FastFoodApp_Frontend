export interface ReportClient {
  timeStamp: Date;
  statusCode: number;
  status: string;
  message: string;
  data: Data;
}

export interface Data {
  report: InfoClient[];
}

export interface InfoClient {
  idUser: number;
  username: string;
  urlImage: string;
  total: number;
}
