import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from "../../../api-calls.service";
import { RoomTemperatureDataList } from "../../models/room-temperature/room-temperature.module";

@Component({
  selector: 'app-room-temperature',
  templateUrl: './room-temperature.component.html',
  styleUrls: ['./room-temperature.component.scss']
})
export class RoomTemperatureComponent implements OnInit {

  roomTemperatureDataList = new RoomTemperatureDataList();

  constructor(private apiCallsService: ApiCallsService) { }

  ngOnInit(): void {

    this.apiCallsService.fetchData();

    this.roomTemperatureDataList = this.apiCallsService.getRoomTemperatures();
    console.log(this.roomTemperatureDataList)


  }



}
