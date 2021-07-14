import { Component, OnInit } from '@angular/core';
import {ApiCallsService} from "../../../api-calls.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['date', 'temperature', 'humidity'];
  dataSource: TableData[] = [];

  roomTemperatureDataList: TableData[] = [];

  constructor(private apiCallsService: ApiCallsService) { }

  ngOnInit(): void {
    this.apiCallsService.getRoomTemperatures().subscribe(
      (data: any) => {
        data.results[0].series[0].values.forEach(
          (element: any) => {
            let roomTemperatureData = {
              date: new Date(element[0]).toLocaleString(),
              humidity: element[1].toFixed(2),
              temperature: element[2].toFixed(2)
            } as TableData;
            this.roomTemperatureDataList.push(roomTemperatureData);
          }
        );
        this.dataSource = this.roomTemperatureDataList;
      }
    );
  }

}

export interface TableData {
  date: any;
  temperature: any;
  humidity: any;
}
