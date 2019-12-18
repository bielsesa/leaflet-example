import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { MarkerService } from './_services/marker.service';
import { PopUpService } from './_services/pop-up.service';
import { ShapeService } from './_services/shape.service';

@NgModule({
  declarations: [AppComponent, MapComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [MarkerService, PopUpService, ShapeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
