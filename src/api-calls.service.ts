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

  getRoomTemperatures() {
    return this.http.get(`${(this.roomTemperatureBaseURL)}?u=${environment.username}&p=${environment.password}&q=${this.query}`);
  }

}
