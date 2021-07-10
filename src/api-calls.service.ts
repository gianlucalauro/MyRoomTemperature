import { Injectable } from '@angular/core';
import { environment} from "./environments/environment";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RoomTemperatureDataList} from "./app/models/room-temperature/room-temperature.module";


@Injectable({
  providedIn: 'root'
})
export class ApiCallsService {

  roomTemperatureBaseURL: string = "http://192.168.1.2:8086/query";
  query: string = `SELECT * FROM "temperature"."onemonth"."myRoom" LIMIT 10`

  roomTemperatureDataList = new RoomTemperatureDataList();

  constructor(private http: HttpClient) { }

  getRoomTemperatureFromAPI(): Observable<any> {
    return this.http.get(`${(this.roomTemperatureBaseURL)}?u=${environment.username}&p=${environment.password}&q=${this.query}`);
  }
  fetchData() {
    this.getRoomTemperatureFromAPI().subscribe(
      (response) => {
        this.roomTemperatureDataList.data = response.results[0].series[0].values;
        this.roomTemperatureDataList.count = response.results[0].series[0].values.length;
      }
    );
  }
  getRoomTemperatures() {
    return this.roomTemperatureDataList;
  }

}
