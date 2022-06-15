import { Component, Input, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-grafic-bar-style-two',
  templateUrl: './grafic-bar-style-two.component.html',
  styles: [],
})
export class GraficBarStyleTwoComponent implements OnInit {
  @Input() dataX: number[] = [];
  @Input() dataY: number[] = [];

  options!: EChartsOption;

  ngOnInit(): void {
    this.infoCanva(this.dataX, this.dataY);
  }

  initOpts = {
    renderer: 'svg',
    width: 400,
    height: 350,
  };
  infoCanva(dataX: number[], dataY: number[]) {
    let prueba = [1, 2, 3, 4, 5, 6, 7];
    let data = [0, 0, 0, 0, 0, 0, 0];
    for (let index = 0; index < prueba.length; index++) {
      for (let index2 = 0; index2 < dataX.length; index2++) {
        if (dataX[index2] == prueba[index]) {
          data[index] = dataY[index2];
        }
      }
    }

    this.options = {
      color: ['#F25D50'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: 'Ventas $',
          type: 'bar',
          barWidth: '60%',
          data: data,
        },
      ],
    };
  }
}
