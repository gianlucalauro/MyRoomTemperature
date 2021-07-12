import {Injectable} from '@angular/core';
import {environment} from "./environments/environment";
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiCallsService {

  roomTemperatureBaseURL: string = "http://192.168.1.2:8086/query";

  from: any = localStorage.getItem("from") + "ms";
  to: any = localStorage.getItem("to") + "ms";
  limit: any = localStorage.getItem("limit");
  granularity: any = localStorage.getItem("granularity");
  query: string = `SELECT mean("humidity"), mean("temperature") FROM "temperature"."onemonth"."myRoom" WHERE time > ${this.from} AND time < ${this.to} GROUP BY time(${this.granularity}) LIMIT ${this.limit}`

  constructor(private http: HttpClient) { }

  roomTemperatureDataList = [];

  getRoomTemperatures() {
    console.log(this.query)
    return this.http.get(`${(this.roomTemperatureBaseURL)}?u=${environment.username}&p=${environment.password}&q=${this.query}`)
      .subscribe(
        (response: any) => {
          for (let i in response.results[0].series[0].values)
            if (response.results[0].series[0].values.hasOwnProperty(i))
            {
              // @ts-ignore
              this.roomTemperatureDataList.push(response.results[0].series[0].values[i]);
            }
        }
      );
  }

}
