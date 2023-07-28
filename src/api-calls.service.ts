import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiCallsService {

  roomTemperatureBaseURL: string = "https://eu-central-1-1.aws.cloud2.influxdata.com/query";

  from: any = localStorage.getItem("from") + "ms";
  to: any = localStorage.getItem("to") + "ms";
  limit: any = localStorage.getItem("limit");
  granularity: any = localStorage.getItem("granularity");
  query: string = `SELECT mean("humidity"), mean("temperature") FROM "temperature"."onemonth"."myRoom" WHERE time > ${this.from} AND time < ${this.to} GROUP BY time(${this.granularity}) LIMIT ${this.limit}`

  constructor(private http: HttpClient) { }

  getRoomTemperatures() {
    return this.http.get(`${(this.roomTemperatureBaseURL)}?q=${this.query}`, {
      headers: new HttpHeaders({
        'Authorization': 'Token _6wxJGsthUtzEPLIyj0ybWODNHTrUS8SlFCWFWNs0jCjnW0ZU-FLkfb8mJSDpEZ625zkcF4WJNi-ZxZir0BCgQ=='
      })
    });
  }

}
