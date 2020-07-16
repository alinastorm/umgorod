import { Component, OnInit, ViewChild, ElementRef, Input, OnDestroy } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, BehaviorSubject, Subject, Subscription } from 'rxjs'
import { map } from 'rxjs/operators';
import { AngularFireAuth } from "@angular/fire/auth";

import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps'
import { FirebaseOperation } from '@angular/fire/database/interfaces';
import { FormControl } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') sidenav: MatSidenav;

  reason = '';

  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }
  // @Input() public city: Subject<any>
  // test;
  htmlStr: string = '';
  itemValue = '';
  items: Observable<any[]>;
  umMarkers: Observable<any[]>;//Маркеры умного Города
  chMarkers: Observable<any[]>;//Марткеры Хроносферы

  @ViewChild(GoogleMap, { static: false }) map: GoogleMap
  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow
  @ViewChild("cont", { static: false })  cont: ElementRef;

  zoom = 6
  center: google.maps.LatLngLiteral
  options: google.maps.MapOptions = {
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    mapTypeId: 'roadmap',
    maxZoom: 20,
    minZoom: 6,
    mapTypeControl:false,
   
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
  // subscription: Subscription
  _map: Observable<any[]>;
  mapFC = new FormControl();

  // pokemonControl = new FormControl();
  mapGroups: mapGroup[] = [
    {
      name: 'Беларусь',
      values: [
        {value: 'bulbasaur-0', viewValue: 'Все',lat:53.9905917,lng:28.3099033, zoom:4},
        {value: 'oddish-1', viewValue: 'Брест',lat:1,lng:2, zoom:11},
        {value: 'bellsprout-2', viewValue: 'Гомель',lat:52.440032,lng:30.986037, zoom:12},
        {value: 'bellsprout-2', viewValue: 'Минск',lat:53.8846196,lng:27.5233293, zoom:11}
      ]
    },
    {
      name: 'Россия',
      disabled: true,
      values: [
        {value: 'charmander-6', viewValue: 'Москва',lat:1,lng:2, zoom:11},
        {value: 'vulpix-7', viewValue: 'Смоленск',lat:1,lng:2, zoom:11},
        {value: 'flareon-8', viewValue: 'Владимир',lat:1,lng:2, zoom:11}
      ]
    }
  ];

  constructor(
    public db: AngularFireDatabase,
   
  ) {
    
    this.umMarkers = db.list('markers').valueChanges().pipe(map((data: any) => data.map((item: any) => {
      item.options = {
        // icon:'https://firebasestorage.googleapis.com/v0/b/umgorod-4ae1a.appspot.com/o/marker5.png?alt=media&token=d414a82c-d47f-4d0f-8d55-67c95d6e8a17',
        animation: google.maps.Animation.DROP,
      }; return item
    })))
    this.chMarkers = db.list('chmarkers').valueChanges().pipe(map((data: any) => data.map((item: any) => {
      item.options = {
        icon: 'https://firebasestorage.googleapis.com/v0/b/umgorod-4ae1a.appspot.com/o/marker5.png?alt=media&token=d414a82c-d47f-4d0f-8d55-67c95d6e8a17',
        animation: google.maps.Animation.DROP,
      }; return item
    })))

    this._map = db.list('map').valueChanges()




  }
  onSubmit() {
    this.db.list('markers').push({ content: this.itemValue });    
    this.itemValue = '';
  }
  ngOnInit() {
    //Продалжаем логинимся через сервис
    // this.db.list('imageDetails').set('URL','gs://umgorod-4ae1a.appspot.com/7.jpg');
    // this.test = this.db.object('test').valueChanges();
    // console.log("this.test", this.test.subscribe(_=> console.log("_",_.main)))
    navigator.geolocation.getCurrentPosition(position => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    })
    // this.subscription = this.city.subscribe(item => {
    //     this.map.panTo({ lat: item.position.lat, lng: item.position.lng })
    // })
    
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

    this.infoWindow.options = this.infoWindowOptions

    this.infoWindow.open(marker);
    this.htmlStr = markerData.html;

  }

  
  viewCity(item) {
    this.map.panTo({ lat: item.lat, lng: item.lng })
    this.zoom = item.zoom
  }


  ngOnDestroy() {
    // this.subscription.unsubscribe()
  }
}


// * interfaces

interface City {
  value: string;
  viewValue: string;
  lat:number,
  lng:number,
  zoom:number
}

interface mapGroup {
  disabled?: boolean;
  name: string;
  values: City[];
}