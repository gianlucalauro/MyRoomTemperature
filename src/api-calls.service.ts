import {Injectable} from '@angular/core';
import {environment} from "./environments/environment";
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiCallsService {

  roomTemperatureBaseURL: string = "http://gianlucalauro.ddns.net:8086/query";

  from: any = localStorage.getItem("from") + "ms";
  to: any = localStorage.getItem("to") + "ms";
  limit: any = localStorage.getItem("limit");
  granularity: any = localStorage.getItem("granularity");
  query: string = `SELECT mean("humidity"), mean("temperature") FROM "temperature"."onemonth"."myRoom" WHERE time > ${this.from} AND time < ${this.to} GROUP BY time(${this.granularity}) LIMIT ${this.limit}`

  constructor(private http: HttpClient) { }

  //roomTemperatureDataList: RoomTemperatureData[] = [];

  /*getRoomTemperatures() {
    console.log(this.query)
    return this.http.get(`${(this.roomTemperatureBaseURL)}?u=${environment.username}&p=${environment.password}&q=${this.query}`)
      .subscribe(
        (response: any) => {
          for (let i in response.results[0].series[0].values)
            if (response.results[0].series[0].values.hasOwnProperty(i))
            {
              let roomTemperatureData = {
                date: response.results[0].series[0].values[i][0],
                humidity: response.results[0].series[0].values[i][1],
                temperature: response.results[0].series[0].values[i][2]
              } as RoomTemperatureData;

              this.roomTemperatureDataList.push(roomTemperatureData);
            }
        }
      );
  }*/

  getRoomTemperatures() {
    return this.http.get(`${(this.roomTemperatureBaseURL)}?u=${environment.username}&p=${environment.password}&q=${this.query}`);
  }

}

/*export interface RoomTemperatureData {
  date: any;
  temperature: any;
  humidity: any;
}*/
