import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiCallsService} from "../../../api-calls.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['date', 'temperature', 'humidity'];

  dataSource = new MatTableDataSource<TableData>();
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  roomTemperatureDataList: TableData[] = [];

  constructor(private apiCallsService: ApiCallsService) { }

  ngOnInit(): void {
    this.apiCallsService.getRoomTemperatures().subscribe(
      (data: any) => {
        data.results[0].series[0].values.forEach(
          (element: any) => {
            if (element[0] != null && element[1] != null && element[2] != null) {
              let roomTemperatureData = {
                date: new Date(element[0]).toLocaleString(),
                humidity: element[1].toFixed(2),
                temperature: element[2].toFixed(2)
              } as TableData;
              this.roomTemperatureDataList.push(roomTemperatureData);
            }
          }
        );
        this.dataSource.data = this.roomTemperatureDataList;
        this.dataSource.paginator = this.paginator
      }
    );
  }

}

export interface TableData {
  date: any;
  temperature: any;
  humidity: any;
}
