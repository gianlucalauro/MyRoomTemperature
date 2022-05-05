import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DialogErrorContent, DialogInfoContent, DialogFilterContent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { TableComponent } from './widgets/table/table.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from "@angular/material/sort";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import { NgxEchartsModule } from 'ngx-echarts';

import { RoomTemperatureComponent } from './pages/room-temperature/room-temperature.component';
import { RaspberryComponent } from './pages/raspberry/raspberry.component';
import {FormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import { LineChartComponent } from './widgets/line-chart/line-chart.component';
import { GaugeComponent } from './widgets/gauge/gauge.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    DialogErrorContent,
    DialogInfoContent,
    DialogFilterContent,
    RoomTemperatureComponent,
    RaspberryComponent,
    LineChartComponent,
    GaugeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    FormsModule,
    MatOptionModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatSlideToggleModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
