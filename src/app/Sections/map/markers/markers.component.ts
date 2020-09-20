import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { FormControl } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { map, filter, switchMap, take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { FireBaseService } from 'src/app/shared/fireBase.service';
import { MatDialog } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { ArticleFromMapComponent } from './article-from-map/article-from-map.component';

@Component({
  selector: 'app-markers',
  templateUrl: './markers.component.html',
  styleUrls: ['./markers.component.css']
})
export class MarkersComponent implements OnInit {

  htmlStr: string = '';
  itemValue = '';
  items: Observable<any[]>;
  umMarkers:  Observable<any[]>;//Маркеры умного Города
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
  // _map2: Observable<any[]>;
  mapFC = new FormControl();



  navItems

  filterOf=true
  // @Input()
  // set filteredIds(ids: any[]) {
  //   console.log('aids', ids)
  //   // if (!ids.length) { return }
  //   // this.filteredIds = (ids)
  //   // this.umMarkers = this.umMarkers.filter(marker =>
  //   //   ids.indexOf(marker.id) > -1);

  // }

  constructor(
    public db: AngularFireDatabase,
    public fbService: FireBaseService,
    public dialog: MatDialog,
    public overlay: Overlay,

  ) {
  }


  ngOnInit(): void {

    // this.fbService.getArticlesStateOrderFilter().pipe(
    //   filter(data => !!data),
    //   map((articles: any[]) => articles.filter(article => article.marker)),
    //   // map((articles: any[]) => {
    //   //   if (this.filteredIds.length)
    //   //     return articles.filter(article =>
    //   //       // article.id == '-MDW1Oss0vwq_ZS6IIHR'
    //   //       this.filteredIds.indexOf(article.id) > -1
    //   //     )
    //   //   return articles
    //   // }),
    //   map((articles: any[]) => articles
    //     .map((article: any) => {
    //       article.options = {
    //         icon: article.marker.icon,
    //         // icon: 'https://firebasestorage.googleapis.com/v0/b/umgorod-4ae1a.appspot.com/o/marker5.png?alt=media&token=d414a82c-d47f-4d0f-8d55-67c95d6e8a17',
    //         animation: google.maps.Animation.DROP,
    //       }; return article
    //     })
    //   )
    // ).subscribe((articles) => this.umMarkers = articles)


    // this.elements = this.fbService.getArticlesStateOrderFilter({'id':id})

    //Продалжаем логинимся через сервис
    // this.db.list('imageDetails').set('URL','gs://umgorod-4ae1a.appspot.com/7.jpg');
    // this.test = this.db.object('test').valueChanges();
    // console.log("this.test", this.test.subscribe(_=> console.log("_",_.main)))

    //TODO
    // navigator.geolocation.getCurrentPosition(position => {
      this.center = {
        lat: 53.5460178,
        // lat: position.coords.latitude,
        lng: 25.877355,
        // lng: position.coords.longitude,
      }
    // })

    // this.subscription = this.city.subscribe(item => {
    //     this.map.panTo({ lat: item.position.lat, lng: item.position.lng })
    // })

    //   this.subscription = this.activateRoute.queryParams.subscribe(
    //     (queryParam: any) => {
    //       this.navItems = queryParam['marker']
    //     console.log("MarkersComponent -> queryParam", queryParam)

    //         // this.product = queryParam['product'];

    //     }
    // );
  }
  // onSubmit2() {
  //   this.db.list('markers').push({ content: this.itemValue });
  //   this.itemValue = '';
  // }



  zoomIn() {
    if (this.zoom < this.options.maxZoom) this.zoom++
  }

  zoomOut() {
    if (this.zoom > this.options.minZoom) this.zoom--
  }

  click(event: google.maps.MouseEvent) {
    // this.map.mapClick.
    console.log(event.latLng.lat(),event.latLng.lng())
    
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


    this.infoContent = markerData.marker.html;
    this.marker = markerData

    this.infoWindow.options = this.infoWindowOptions

    this.htmlStr = markerData.html;
    this.infoWindow.open(marker);

  }
  openArticle(item) {
    if(!item.html)return
    return this.dialog.open(ArticleFromMapComponent, {
      autoFocus: false,
      restoreFocus: false,
      hasBackdrop: false,
      panelClass: item.id,
      maxHeight: '99vh',
      data: {item},
      scrollStrategy: this.overlay.scrollStrategies.noop()
    });

  }


  viewCity(item) {
    this.map.panTo({ lat: item.lat, lng: item.lng })
    this.zoom = item.zoom
  }


  ngOnDestroy() {
    // this.subscription.unsubscribe()
  }

}
