export class RoomTemperatureDataList {
  count: number;
  data: Array<RoomTemperatureData>;
  constructor() {
    this.count = 0;
    this.data = [];
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
