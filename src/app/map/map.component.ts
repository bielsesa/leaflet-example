import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { icon, Marker } from 'leaflet';
import { MarkerService } from '../_services/marker.service';
import { ShapeService } from '../_services/shape.service';

/* this is needed so the app doesn't give the */
/* 404 resources not found error.             */
/* the leaflet assets are copied locally.     */
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  private map;
  private states;

  constructor(
    private markerService: MarkerService,
    private shapeService: ShapeService
  ) {}

  ngAfterViewInit(): void {
    this.initMap();
    //this.markerService.makeCapitalsMarkers(this.map);
    this.markerService.makeCapitalsCircleMarkers(this.map);
    this.shapeService.getStateShapes().subscribe(states => {
      this.states = states;
      this.initStatesLayer();
    });
  }

  private initMap(): void {
    this.map = L.map('map', {
      // ^^^^^^^ 'map' is the ID of the div containing the map
      //center: [41.3851, 2.1734],
      center: [40.866667, 34.566667], // <--- Geographic Centre of the Earth
      zoom: 3
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 19,
        minZoom: 2,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }
    );

    tiles.addTo(this.map);
  }

  private initStatesLayer() {
    const stateLayer = L.geoJSON(this.states, {
      style: feature => ({
        weight: 3,
        opacity: 0.5,
        color: '#008f68',
        fillOpacity: 0.8,
        fillColor: '#6DB65B'
      }),
      onEachFeature: (feature, layer) =>
        layer.on({
          mouseover: e => this.highlightFeature(e),
          mouseout: e => this.resetFeature(e)
        })
    });

    this.map.addLayer(stateLayer);
    stateLayer.bringToBack();
  }

  private highlightFeature(e) {
    const layer = e.target;
    layer.setStyle({
      weight: 10,
      opacity: 1.0,
      color: '#DFA612',
      fillOpacity: 1.0,
      fillColor: '#FAE042'
    });
  }

  private resetFeature(e) {
    const layer = e.target;
    layer.setStyle({
      weight: 3,
      opacity: 0.5,
      color: '#008f68',
      fillOpacity: 0.8,
      fillColor: '#6DB65B'
    });
  }
}
