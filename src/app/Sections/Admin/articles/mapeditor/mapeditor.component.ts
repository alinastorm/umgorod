import { Component, OnInit, Injectable, Input, Inject, Optional, ViewChild, ElementRef } from '@angular/core';

// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import * as Editor from '../../../shared/ckeditor'
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
// import * as ClassicEditor2 from '@ckeditor/ckeditor5-upload/src/filerepository';
// import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { AngularFireStorage } from '@angular/fire/storage';
import { FireBaseService, url } from 'src/app/shared/fireBase.service';
import { finalize, take } from 'rxjs/operators';
import { promise } from 'protractor';
import { FormControl, Validators, FormGroup, FormBuilder, NgModel } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DateAdapter } from '@angular/material/core';
import { Observable } from 'rxjs';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';


@Component({
  selector: 'app-mapeditor',
  templateUrl: './mapeditor.component.html',
  styleUrls: ['./mapeditor.component.css']
})
export class MapeditorComponent implements OnInit {

  article

  public html: any
  public model;
  formItems: FormGroup
  controls: string[]
  visible
  //map
  htmlStr: string = '';
  itemValue = '';
  items: Observable<any[]>;
  umMarker2: any;//Маркеры умного Города
  chMarkers: Observable<any[]>;//Марткеры Хроносферы

  @ViewChild(GoogleMap, { static: false }) map: GoogleMap
  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow
  @ViewChild("cont", { static: false }) cont: ElementRef;

  zoom = 6
  center: google.maps.LatLngLiteral
  options: google.maps.MapOptions = {
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    mapTypeId: 'roadmap',
    maxZoom: 20,
    minZoom: 6,
    mapTypeControl: false,
  }
  infoWindowOptions: google.maps.InfoWindowOptions = {
    maxWidth: 300,
  }
  infoContent = '';
  marker = { imgs: [] }
  // subscription: Subscription
  // _map2: Observable<any[]>;
  mapFC = new FormControl();



  navItems

  filterOf = true
  //!map

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any, //Обязательные данные при запуске . node + actionName
    private formBuilder: FormBuilder,
  ) { this.article = this.data.item }

  ngOnInit(): void {
    this.formItems = this.formBuilder.group(this.data.item.marker)
    this.controls = Object.keys(this.data.item.marker)
    //TODO
    // navigator.geolocation.getCurrentPosition(position => {
    this.center = {
      lat: 53.5460178,
      // lat: position.coords.latitude,
      lng: 25.877355,
      // lng: position.coords.longitude,
    }
    // })

  }



  save() {
    this.article.marker = this.formItems.value
    this.dialogRef.close(this.article);
  }
  // addMarker() {
  //   this.markers.push({
  //     position: {
  //       lat: this.center.lat ,
  //       lng: this.center.lng ,
  //     },
  //     // label: {
  //     //   color: 'purple',
  //     //   text: 'Marker label ' + (this.markers.length + 1),
  //     // },
  //     title: 'Marker title ' + (this.markers.length + 1),
  //     info: 'Marker info ' + (this.markers.length + 1),
  //     options: {
  //       animation: google.maps.Animation.DROP,
  //     },
  //   })
  // }
  //map


  zoomIn() {
    if (this.zoom < this.options.maxZoom) this.zoom++
  }

  zoomOut() {
    if (this.zoom > this.options.minZoom) this.zoom--
  }

  changeLat(lat: number) {
    this.changePosition({ lat })
  }

  changeLng(lng: number) {
    this.changePosition({ lng })
  }

  changePositionOnMap(event: google.maps.MouseEvent) {
    this.changePosition({ lat: event.latLng.lat(), lng: event.latLng.lng() })
  }

  changePosition(params: { [key: string]: number; }) {
    let lat = params.lat || this.article.marker.position.lat;
    let lng = params.lng || this.article.marker.position.lng
    this.formItems.controls['position'].setValue({ lat, lng })
    this.article.marker.position = { lat, lng }
  }

  logCenter() {
  }

  // addMarker() {
  //   this.markers.push({
  //     position: {
  //       lat: this.center.lat + ((Math.random() - 0.5) * 2) / 10,
  //       lng: this.center.lng + ((Math.random() - 0.5) * 2) / 10,
  //     },
  //     // label: {
  //     //   color: 'purple',
  //     //   text: 'Marker label ' + (this.markers.length + 1),
  //     // },
  //     title: 'Marker title ' + (this.markers.length + 1),
  //     info: 'Marker info ' + (this.markers.length + 1),
  //     options: {
  //       animation: google.maps.Animation.DROP,
  //     },
  //   })
  // }

  openInfo(marker: MapMarker, markerData) {


    this.infoContent = markerData.marker.html;
    this.marker = markerData

    this.infoWindow.options = this.infoWindowOptions

    this.infoWindow.open(marker);
    this.htmlStr = markerData.html;

  }


  // viewCity(item) {
  //   this.map.panTo({ lat: item.lat, lng: item.lng })
  //   this.zoom = item.zoom
  // }




}
