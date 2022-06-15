import { Component, Input, OnInit } from '@angular/core';
import LinearGradient from 'zrender/lib/graphic/LinearGradient';
@Component({
  selector: 'app-grafic-bar-style-one',
  templateUrl: './grafic-bar-style-one.component.html',
  styles: [],
})
export class GraficBarStyleOneComponent implements OnInit {
  @Input() dataX: string[] = [];
  @Input() dataY: number[] = [];
  options: any;

  ngOnInit(): void {
    this.infoCanva(this.dataX, this.dataY);
  }

  infoCanva(dataAxis: string[], data: number[]) {
    const yMax = 100000;
    const dataShadow = [];

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < data.length; i++) {
      dataShadow.push(yMax);
    }

    this.options = {
      title: {
        text: 'Ventas por mes',
      },
      xAxis: {
        data: dataAxis,
        axisLabel: {
          inside: false,
          color: '#999',
        },
        axisTick: {
          show: true,
        },
        axisLine: {
          show: true,
        },
        z: 10,
      },
      yAxis: {
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          textStyle: {
            color: '#999',
          },
        },
      },
      dataZoom: [
        {
          type: 'inside',
        },
      ],
      series: [
        {
          // For shadow
          type: 'bar',
          itemStyle: {
            color: 'rgba(0,0,0,0.05)',
          },
          barGap: '-100%',
          barCategoryGap: '40%',
          data: dataShadow,
          animation: false,
        },
        {
          type: 'bar',
          itemStyle: {
            color: new LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#83bff6' },
              { offset: 0.5, color: '#188df0' },
              { offset: 1, color: '#188df0' },
            ]),
          },
          emphasis: {
            itemStyle: {
              color: new LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#2378f7' },
                { offset: 0.7, color: '#2378f7' },
                { offset: 1, color: '#83bff6' },
              ]),
            },
          },
          data,
        },
      ],
    };
  }
}
