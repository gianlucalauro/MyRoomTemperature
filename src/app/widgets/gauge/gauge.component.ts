import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from "../../../api-calls.service";
import {EChartsOption} from "echarts";
import {animate, style, transition, trigger, state} from "@angular/animations";

@Component({
  selector: 'app-gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.scss'],
  animations: [
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(-360deg)' })),
      transition('default => rotated', animate('300ms ease-in')),
      transition('rotated => default', animate('300ms ease-out'))
    ])
  ]
})
export class GaugeComponent implements OnInit {

  constructor(private apiCallsService: ApiCallsService) { }

  state: string = 'default';
  rotate() {
    this.state = (this.state === 'default' ? 'rotated' : 'default');
  }

  humidityList = [];

  minHumidity = [];
  avgHumidity = [];
  maxHumidity = [];

  ngOnInit(): void {
    this.apiCallsService.getRoomTemperatures().subscribe(
      (data: any) => {
        data.results[0].series[0].values.forEach(
          (element: any) => {
            if (element[0] != null && element[1] != null && element[2] != null) {
              // @ts-ignore
              this.humidityList.push(element[1]);
            }
          }
        );
        // @ts-ignore
        this.minHumidity.push(Math.min(...this.humidityList).toFixed(2));
        // @ts-ignore
        this.avgHumidity.push((this.humidityList.reduce((a, b) => a + b, 0)/this.humidityList.length).toFixed(2));
        // @ts-ignore
        this.maxHumidity.push(Math.max(...this.humidityList).toFixed(2));
      }
    );
  }

  minGaugeInstance: any;
  avgGaugeInstance: any;
  maxGaugeInstance: any;

  onMinGaugeInit(ec: any) {
    this.minGaugeInstance = ec;
  }
  onAvgGaugeInit(ec: any) {
    this.avgGaugeInstance = ec;
  }
  onMaxGaugeInit(ec: any) {
    this.maxGaugeInstance = ec;
  }

  refreshChart() {
    this.rotate();
    if (this.minGaugeInstance) {
      this.minGaugeInstance.setOption({
        color: "green",
        legend: {
          data: ['Umidità Minima %']
        },
        series: [
          {
            name: 'Umidità Minima %',
            type: 'gauge',
            data: this.minHumidity,
          },
        ],
      })
    }

    if (this.avgGaugeInstance) {
      this.avgGaugeInstance.setOption({
        color: "green",
        legend: {
          data: ['Umidità Media %']
        },
        series: [
          {
            name: 'Umidità Media %',
            type: 'gauge',
            data: this.avgHumidity,
          },
        ],
      })
    }

    if (this.maxGaugeInstance) {
      this.maxGaugeInstance.setOption({
        color: "green",
        legend: {
          data: ['Umidità Massima %']
        },
        series: [
          {
            name: 'Umidità Massima %',
            type: 'gauge',
            data: this.maxHumidity,
          },
        ],
      })
    }
  }

  gaugeMinHumidity: EChartsOption = {
    color: "green",
    legend: {
      data: ['Umidità Minima %']
    },
    series: [
      {
        name: 'Umidità Minima %',
        type: 'gauge',
        data: this.minHumidity,
      },
    ],
  };
  gaugeAvgHumidity: EChartsOption = {
    color: "green",
    legend: {
      data: ['Umidità Media %']
    },
    series: [
      {
        name: 'Umidità Media %',
        type: 'gauge',
        data: this.avgHumidity,
      },
    ],
  };
  gaugeMaxHumidity: EChartsOption = {
    color: "green",
    legend: {
      data: ['Umidità Massima %']
    },
    series: [
      {
        name: 'Umidità Massima %',
        type: 'gauge',
        data: this.maxHumidity,
      },
    ],
  };

}
