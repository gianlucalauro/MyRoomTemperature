import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['date', 'temperature', 'humidity'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {



  }

}

export interface TableData {
  date: string;
  temperature: number;
  humidity: number;
}

const ELEMENT_DATA: TableData[] = [
  //get the data from API
  {date: "prova", temperature: 31.50, humidity: 50}
];
