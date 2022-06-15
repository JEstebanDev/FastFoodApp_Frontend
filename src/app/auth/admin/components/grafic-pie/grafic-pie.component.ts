import { Component, Input, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { ThemeOption } from 'ngx-echarts';
import { DataPie } from '../../interfaces/dataPie.interface';

@Component({
  selector: 'app-grafic-pie',
  templateUrl: './grafic-pie.component.html',
  styles: [],
})
export class GraficPieComponent implements OnInit {
  @Input() Pielabels: string[] = [];
  @Input() Piedata: DataPie[] = [];
  options!: EChartsOption;
  theme!: string | ThemeOption;

  ngOnInit(): void {
    this.options = {
      title: {},
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br>{b} : {c} ({d}%)',
      },
      legend: {
        align: 'left',
        data: this.Pielabels,
      },
      calculable: true,
      series: [
        {
          name: 'Detalles',
          type: 'pie',
          radius: [25, 80],
          roseType: 'area',
          data: this.Piedata,
        },
      ],
    };
  }
}
