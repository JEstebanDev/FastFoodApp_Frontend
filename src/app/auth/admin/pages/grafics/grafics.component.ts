import { Component, OnInit } from '@angular/core';
import { Report } from '../../interfaces/reportProduct.interface';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-grafics',
  templateUrl: './grafics.component.html',
  styles: [],
})
export class GraficsComponent implements OnInit {
  constructor(private reportService: ReportService) {}
  MonthlydataX: string[] = [];
  MonthlydataY: number[] = [];
  WeeklydataX: number[] = [];
  WeeklydataY: number[] = [];
  reportProducts: Report[] = [];
  ngOnInit(): void {
    this.reportService.getSalesMonthly().subscribe((report) => {
      report.data.report.forEach((element) => {
        this.MonthlydataX.push(this.monthValidate(element.month));
        this.MonthlydataY.push(element.total);
      });
    });

    this.reportService.getSalesWeekly().subscribe((report) => {
      report.data.report.forEach((element) => {
        this.WeeklydataX.push(element.weekday);
        this.WeeklydataY.push(element.total);
      });
    });

    this.reportService
      .getRankProducts(null, null, null, null)
      .subscribe((listProducts) => {
        if (listProducts.data != null) {
          this.reportProducts = listProducts.data.report;
        }
      });
  }
  monthValidate(month: number): string {
    let monthString = '';
    switch (month) {
      case 1:
        monthString = 'Enero';
        break;

      case 2:
        monthString = 'Febrero';
        break;
      case 3:
        monthString = 'Marzo';
        break;
      case 4:
        monthString = 'Abril';
        break;
      case 5:
        monthString = 'Mayo';
        break;
      case 6:
        monthString = 'Junio';
        break;
      case 7:
        monthString = 'Julio';
        break;
      case 8:
        monthString = 'Agosto';
        break;
      case 9:
        monthString = 'Septiembre';
        break;
      case 10:
        monthString = 'Octubre';
        break;
      case 11:
        monthString = 'Noviembre';
        break;
      case 12:
        monthString = 'Diciembre';
        break;
    }
    return monthString;
  }
}
