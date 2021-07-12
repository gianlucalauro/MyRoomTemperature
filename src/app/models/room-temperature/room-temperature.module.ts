export class RoomTemperatureDataList {
  data: Array<RoomTemperatureData>;
  constructor(data: Array<RoomTemperatureData>) {
    this.data = data;
  }

  get(index: number): RoomTemperatureData {
    return this.data[index];
  }

  add(value: RoomTemperatureData): void {
    this.data.push(value);
  }

}


export class RoomTemperatureData {
  date: string;
  temperature: number;
  humidity: number;
  constructor(date: string, temperature: number, humidity: number) {
    this.date = date;
    this.temperature = temperature;
    this.humidity = humidity;
  }
}
