import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from "../../../api-calls.service";
import { EChartsOption } from 'echarts';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
  animations: [
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(-360deg)' })),
      transition('default => rotated', animate('300ms ease-in')),
      transition('rotated => default', animate('300ms ease-out'))
    ])
  ]
})
export class LineChartComponent implements OnInit {

  constructor(private apiCallsService: ApiCallsService) { }

  state: string = 'default';
  rotate() {
    this.state = (this.state === 'default' ? 'rotated' : 'default');
  }

  dateList = [];
  temperatureList = [];
  humidityList = [];

  ngOnInit(): void {
    this.apiCallsService.getRoomTemperatures().subscribe(
      (data: any) => {
        data.results[0].series[0].values.forEach(
          (element: any) => {
            if (element[0] != null && element[1] != null && element[2] != null) {
              // @ts-ignore
              this.dateList.push(new Date(element[0]).toLocaleString());
              // @ts-ignore
              this.humidityList.push(element[1].toFixed(2));
              // @ts-ignore
              this.temperatureList.push(element[2].toFixed(2));
            }
          }
        );
      }
    );
  }

  echartsInstance: any;

  onChartInit(ec: any) {
    this.echartsInstance = ec;
  }

  refreshChart() {
    this.rotate();
    if (this.echartsInstance) {
      this.echartsInstance.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        xAxis: {
          type: 'category',
          data: this.dateList,
        },
        yAxis: {
          type: 'value',
        },
        legend: {
          data: ['Temperatura', 'Umidità']
        },
        series: [
          {
            name: 'Temperatura',
            type: 'line',
            areaStyle: { color: 'blue', opacity: 0.5},
            data: this.temperatureList,
            stack: 'counts',
          },
          {
            name: 'Umidità',
            type: 'line',
            areaStyle: { color: 'green', opacity: 0.5},
            data: this.humidityList,
            stack: 'counts',
          },
        ]
      })
    }
  }

  chartOption: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    xAxis: {
      type: 'category',
      data: this.dateList,
    },
    yAxis: {
      type: 'value',
    },
    legend: {
      data: ['Temperatura', 'Umidità']
    },
    series: [
      {
        name: 'Temperatura',
        type: 'line',
        areaStyle: { color: 'blue', opacity: 0.5},
        data: this.temperatureList,
        stack: 'counts',
      },
      {
        name: 'Umidità',
        type: 'line',
        areaStyle: { color: 'green', opacity: 0.5},
        data: this.humidityList,
        stack: 'counts',
      },
    ],
  };

}
