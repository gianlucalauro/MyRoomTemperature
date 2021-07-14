import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from "../../../api-calls.service";
import {EChartsOption} from "echarts";

@Component({
  selector: 'app-gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.scss']
})
export class GaugeComponent implements OnInit {

  constructor(private apiCallsService: ApiCallsService) { }

  dateList = [];
  temperatureList = [];
  humidityList = [];

  minTemp = [];
  avgTemp = [];
  maxTemp = [];

  ngOnInit(): void {
    this.apiCallsService.getRoomTemperatures().subscribe(
      (data: any) => {
        data.results[0].series[0].values.forEach(
          (element: any) => {
            if (element[0] != null || element[1] != null || element[2] != null) {
              // @ts-ignore
              this.dateList.push(new Date(element[0]).toLocaleString());
              // @ts-ignore
              this.humidityList.push(element[1]);
              // @ts-ignore
              this.temperatureList.push(element[2]);
            }
          }
        );
        // @ts-ignore
        this.minTemp.push(Math.min(...this.temperatureList).toFixed(2));
        // @ts-ignore
        this.avgTemp.push((this.temperatureList.reduce((a, b) => a + b, 0)/this.temperatureList.length).toFixed(2));
        // @ts-ignore
        this.maxTemp.push(Math.max(...this.temperatureList).toFixed(2));
      }
    );
  }

  gaugeMinTemp: EChartsOption = {
    legend: {
      data: ['Temperatura Minima']
    },
    series: [
      {
        name: 'Temperatura Minima',
        type: 'gauge',
        data: this.minTemp,
      },
    ],
  };
  gaugeAvgTemp: EChartsOption = {
    legend: {
      data: ['Temperatura Media']
    },
    series: [
      {
        name: 'Temperatura Media',
        type: 'gauge',
        data: this.avgTemp,
      },
    ],
  };
  gaugeMaxTemp: EChartsOption = {
    legend: {
      data: ['Temperatura Massima']
    },
    series: [
      {
        name: 'Temperatura Massima',
        type: 'gauge',
        data: this.maxTemp,
      },
    ],
  };

}
