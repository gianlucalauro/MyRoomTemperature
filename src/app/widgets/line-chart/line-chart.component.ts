import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from "../../../api-calls.service";
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  constructor(private apiCallsService: ApiCallsService) { }

  dateList = [];
  temperatureList = [];
  humidityList = [];

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

      }
    );
  }

  chartOption: EChartsOption = {
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
        data: this.temperatureList,
        stack: 'counts',
      },
      {
        name: 'Umidità',
        type: 'line',
        data: this.humidityList,
        stack: 'counts',
      },
    ],
  };

}
