import { Component, Input, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { ThemeOption } from 'ngx-echarts';
import { DataPie } from '../../interfaces/dataPie.interface';
import { Report } from '../../interfaces/reportProduct.interface';

@Component({
  selector: 'app-grafic-pie',
  templateUrl: './grafic-pie.component.html',
  styles: [],
})
export class GraficPieComponent implements OnInit {
  @Input() reportProducts: Report[] = [];
  options!: EChartsOption;
  theme!: string | ThemeOption;
  labels: string[] = [];
  data: DataPie[] = [];
  ngOnInit(): void {
    this.reportProducts.forEach((element) => {
      this.labels.push((element.idProduct + ' - ' + element.name).toString());
      this.data.push({
        name: (element.idProduct + ' - ' + element.name).toString(),
        value: element.total,
      });
    });
    this.options = {
      title: {},
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br>{b} : {c} ({d}%)',
      },
      legend: {
        align: 'left',
        data: this.labels,
      },
      calculable: true,
      series: [
        {
          name: 'Detalles',
          type: 'pie',
          radius: [25, 100],
          roseType: 'area',
          data: this.data,
        },
      ],
    };
  }
}
