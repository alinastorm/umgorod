import { Component, ViewChild, ElementRef } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators';

import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps'
import { ClassGetter } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  itemValue = '';
  items: Observable<any[]>;
  umMarkers: Observable<any[]>;
  chMarkers: Observable<any[]>;

  @ViewChild(GoogleMap, { static: false }) map: GoogleMap
  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow
  @ViewChild("cont", { static: false })
  cont: ElementRef;

  zoom = 0
  center: google.maps.LatLngLiteral
  options: google.maps.MapOptions = {
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    mapTypeId: 'roadmap',
    maxZoom: 20,
    minZoom: 7,
    // styles:[
    //   {
    //     "elementType": "geometry",
    //     "stylers": [
    //       {
    //         "color": "#f5f5f5"
    //       }
    //     ]
    //   },
    //   {
    //     "elementType": "labels.icon",
    //     "stylers": [
    //       {
    //         "visibility": "on"
    //       }
    //     ]
    //   },
    //   {
    //     "elementType": "labels.text.fill",
    //     "stylers": [
    //       {
    //         "color": "#616161"
    //       }
    //     ]
    //   },
    //   {
    //     "elementType": "labels.text.stroke",
    //     "stylers": [
    //       {
    //         "color": "#f5f5f5"
    //       }
    //     ]
    //   },
    //   {
    //     "featureType": "administrative.land_parcel",
    //     "elementType": "labels.text.fill",
    //     "stylers": [
    //       {
    //         "color": "#bdbdbd"
    //       }
    //     ]
    //   },
    //   {
    //     "featureType": "landscape.man_made",
    //     "stylers": [
    //       {
    //         "color": "#fa7841"
    //       }
    //     ]
    //   },
    //   {
    //     "featureType": "landscape.natural",
    //     "stylers": [
    //       {
    //         "color": "#74c77c"
    //       },
    //       {
    //         "lightness": -55
    //       }
    //     ]
    //   },
    //   {
    //     "featureType": "poi",
    //     "elementType": "geometry",
    //     "stylers": [
    //       {
    //         "color": "#eeeeee"
    //       }
    //     ]
    //   },
    //   {
    //     "featureType": "poi",
    //     "elementType": "labels.text.fill",
    //     "stylers": [
    //       {
    //         "color": "#757575"
    //       }
    //     ]
    //   },
    //   {
    //     "featureType": "poi.park",
    //     "elementType": "geometry",
    //     "stylers": [
    //       {
    //         "color": "#e5e5e5"
    //       }
    //     ]
    //   },
    //   {
    //     "featureType": "poi.park",
    //     "elementType": "labels.text.fill",
    //     "stylers": [
    //       {
    //         "color": "#9e9e9e"
    //       }
    //     ]
    //   },
    //   {
    //     "featureType": "road",
    //     "elementType": "geometry",
    //     "stylers": [
    //       {
    //         "color": "#ffffff"
    //       }
    //     ]
    //   },
    //   {
    //     "featureType": "road.arterial",
    //     "elementType": "labels.text.fill",
    //     "stylers": [
    //       {
    //         "color": "#757575"
    //       }
    //     ]
    //   },
    //   {
    //     "featureType": "road.highway",
    //     "elementType": "geometry",
    //     "stylers": [
    //       {
    //         "color": "#dadada"
    //       }
    //     ]
    //   },
    //   {
    //     "featureType": "road.highway",
    //     "elementType": "labels.text.fill",
    //     "stylers": [
    //       {
    //         "color": "#616161"
    //       }
    //     ]
    //   },
    //   {
    //     "featureType": "road.local",
    //     "elementType": "labels.text.fill",
    //     "stylers": [
    //       {
    //         "color": "#9e9e9e"
    //       }
    //     ]
    //   },
    //   {
    //     "featureType": "transit.line",
    //     "elementType": "geometry",
    //     "stylers": [
    //       {
    //         "color": "#e5e5e5"
    //       }
    //     ]
    //   },
    //   {
    //     "featureType": "transit.station",
    //     "elementType": "geometry",
    //     "stylers": [
    //       {
    //         "color": "#eeeeee"
    //       }
    //     ]
    //   },
    //   {
    //     "featureType": "water",
    //     "elementType": "geometry",
    //     "stylers": [
    //       {
    //         "color": "#c9c9c9"
    //       }
    //     ]
    //   },
    //   {
    //     "featureType": "water",
    //     "elementType": "labels.text.fill",
    //     "stylers": [
    //       {
    //         "color": "#9e9e9e"
    //       }
    //     ]
    //   }
    // ]
  }
  infoWindowOptions: google.maps.InfoWindowOptions = {
    maxWidth: 300,
  }
  infoContent = '';
  marker = { imgs: [] }
  constructor(
    public db: AngularFireDatabase
  ) {
    this.umMarkers = db.list('markers').valueChanges().pipe(map((data: any) => data.map((item: any) => {
      item.options = {
        // icon:'https://firebasestorage.googleapis.com/v0/b/umgorod-4ae1a.appspot.com/o/marker5.png?alt=media&token=d414a82c-d47f-4d0f-8d55-67c95d6e8a17',
        animation: google.maps.Animation.DROP,
      }; return item
    })))
    this.chMarkers = db.list('chmarkers').valueChanges().pipe(map((data: any) => data.map((item: any) => {
      item.options = {
        icon:'https://firebasestorage.googleapis.com/v0/b/umgorod-4ae1a.appspot.com/o/marker5.png?alt=media&token=d414a82c-d47f-4d0f-8d55-67c95d6e8a17',
        animation: google.maps.Animation.DROP,
      }; return item
      console.log("AppComponent -> this.chMarkers", this.chMarkers)
    })))



  }
  onSubmit() {
    this.db.list('markers').push({ content: this.itemValue });
    this.itemValue = '';
  }
  ngOnInit() {
    navigator.geolocation.getCurrentPosition(position => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    })
  }

  zoomIn() {
    if (this.zoom < this.options.maxZoom) this.zoom++
  }

  zoomOut() {
    if (this.zoom > this.options.minZoom) this.zoom--
  }

  click(event: google.maps.MouseEvent) {
    console.log(event)
  }

  logCenter() {
    console.log(JSON.stringify(this.map.getCenter()))
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


    this.infoContent = markerData.info;
    this.marker = markerData
    console.log("AppComponent -> openInfo -> this.marker", this.marker)

    this.infoWindow.options = this.infoWindowOptions

    this.infoWindow.open(marker);

  }


}
