import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { ThemeOption } from 'ngx-echarts';
import { DataPie } from '../../interfaces/dataPie.interface';
import { InfoClient } from '../../interfaces/reportClient.interface';
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

  Label: string = '';
  WeeklydataX: number[] = [];
  WeeklydataY: number[] = [];

  PieProductsLabels: string[] = [];
  PieProductsData: DataPie[] = [];
  options!: EChartsOption;
  theme!: string | ThemeOption;

  PiePayModeLabels: string[] = [];
  PiePayModeData: DataPie[] = [];

  reportClient: InfoClient[] = [];

  reloadProduct(reportProduct: Report[]) {
    this.PieProductsLabels = [];
    this.PieProductsData = [];
    reportProduct.forEach((element) => {
      this.PieProductsLabels.push(
        (element.idProduct + ' - ' + element.name).toString()
      );
      this.PieProductsData.push({
        name: (element.idProduct + ' - ' + element.name).toString(),
        value: element.total,
      });
    });
    this.rankProduct(this.PieProductsLabels, this.PieProductsData);
  }

  ngOnInit(): void {
    this.reportClient = [];
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

    this.reportService.getClient(null, null, null).subscribe((report) => {
      report.data.report.forEach((element) => {
        this.reportClient.push({
          idUser: element.idUser,
          total: element.total,
          urlImage: element.urlImage,
          username: element.username,
        });
      });
    });

    this.reportService
      .getRankProducts(null, null, null, null)
      .subscribe((listProducts) => {
        if (listProducts.data != null) {
          this.PieProductsLabels = [];
          this.PieProductsData = [];
          listProducts.data.report.forEach((element) => {
            this.PieProductsLabels.push(
              (element.idProduct + ' - ' + element.name).toString()
            );
            this.PieProductsData.push({
              name: (element.idProduct + ' - ' + element.name).toString(),
              value: element.total,
            });
          });
          this.rankProduct(this.PieProductsLabels, this.PieProductsData);
        }
      });

    this.reportService.getQuatityPayMode().subscribe((report) => {
      report.data.report.forEach((element) => {
        this.PiePayModeLabels.push(element.idPayMode + ' - ' + element.name);
        this.PiePayModeData.push({
          name: (element.idPayMode + ' - ' + element.name).toString(),
          value: element.quantity,
        });
      });
    });
  }
  reloadClient(reportClient: InfoClient[]) {
    this.reportClient = reportClient;
  }

  rankProduct(PieProductsLabels: string[], PieProductsData: DataPie[]) {
    this.options = {
      title: {},
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br>{b} : {c} ({d}%)',
      },
      legend: {
        align: 'left',
        data: PieProductsLabels,
      },
      calculable: true,
      series: [
        {
          name: 'Detalles',
          type: 'pie',
          radius: [25, 80],
          roseType: 'area',
          data: PieProductsData,
        },
      ],
    };
  }

  monthValidate(month: number): string {
    let monthString = '';
    switch (month) {
      case 1:
        monthString = 'Ene';
        break;

      case 2:
        monthString = 'Feb';
        break;
      case 3:
        monthString = 'Mar';
        break;
      case 4:
        monthString = 'Abr';
        break;
      case 5:
        monthString = 'May';
        break;
      case 6:
        monthString = 'Jun';
        break;
      case 7:
        monthString = 'Jul';
        break;
      case 8:
        monthString = 'Ago';
        break;
      case 9:
        monthString = 'Sep';
        break;
      case 10:
        monthString = 'Oct';
        break;
      case 11:
        monthString = 'Nov';
        break;
      case 12:
        monthString = 'Dic';
        break;
    }
    return monthString;
  }
}
