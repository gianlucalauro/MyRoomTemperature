import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from "../../../api-calls.service";

@Component({
  selector: 'app-room-temperature',
  templateUrl: './room-temperature.component.html',
  styleUrls: ['./room-temperature.component.scss']
})
export class RoomTemperatureComponent implements OnInit {

  constructor(private apiCallsService: ApiCallsService) { }

  ngOnInit(): void {
    this.apiCallsService.getRoomTemperatures();
  }

}
