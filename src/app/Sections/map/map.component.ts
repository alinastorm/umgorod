import { Component, OnInit, ViewChild, ElementRef, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, BehaviorSubject, Subject, Subscription } from 'rxjs'
import { map, filter, switchMap, tap, take, switchAll } from 'rxjs/operators';
import { AngularFireAuth } from "@angular/fire/auth";

import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps'
import { FirebaseOperation } from '@angular/fire/database/interfaces';
import { FormControl } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { FireBaseService } from 'src/app/shared/fireBase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MarkersComponent } from './markers/markers.component';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  navItems: Observable<any[]>
  elements2
  navQueryParams = {}
  disabled = false;
  private subscription: Subscription;
  queryParams = []
  panelOpenState = false;
  @ViewChild(MarkersComponent, { static: true })
  private markers: MarkersComponent
  private obs = new BehaviorSubject([])

  constructor(
    public firedb: AngularFireDatabase,
    public fbService: FireBaseService,
    private router: Router,
    private activateRoute: ActivatedRoute,

  ) {
    //отработка запуска компонента по ссылке с указанными параметрами 
    this.navItems = this.activateRoute.queryParams.pipe(
      take(1),//что бы не закрывался баян  мы берем первые значения роута и дальше отписываемся от его просмотра   
      switchMap(queryParamsRoute => {
        return this.fbService.getArticlesStateOrderFilter().pipe(
          filter(data => !!data),
          map((articles: any[]) => articles.filter(article => article.marker)),//только markers
          map((articles: any[]) =>
            articles.map(article => {
              if (!!queryParamsRoute['filter']) {
                this.disabled = true
                this.markers.filterOf = false
                this.queryParams = (queryParamsRoute['filter'].split(',')) //заполним параметры из ссыылки
                if (this.queryParams.includes(article.id)) {
                  article.completed = true
                }
              }
              else article.completed = false
              return article
            })
          ),
          map((articles: any[]) => articles
            .map((article: any) => {
              article.options = {
                icon: article.marker.icon,

                // icon: 'https://firebasestorage.googleapis.com/v0/b/umgorod-4ae1a.appspot.com/o/marker5.png?alt=media&token=d414a82c-d47f-4d0f-8d55-67c95d6e8a17',
                animation: article.marker.animation ? google.maps.Animation.BOUNCE : null,
              }; return article
            })
          ),
        )
      }),
    )





    // .subscribe(data => this.navItems = data)


    // this.navItems = firedb.list('articles').valueChanges().pipe(
    //   filter((item:any) => item.marker),
    //   switchMap((data)=>this.activateRoute.params.pipe(params=>)),

    //   map(data=>data)
    //   )
    // .subscribe((data: any[]) => { this.navItems = data.filter(item => { return item.marker }) })
    // this.elements = fbService.getArticlesStateOrderFilter({ 'articles': false })



    // this.subscription = this.activateRoute.params.subscribe(params => {
    //   if (params['id'] == 'all') this.umMarkers = this.fbService.getArticlesStateOrderFilter({ 'articles': false })
    //   else if (params['id'] == '') { delete this.umMarkers }
    //   else this.umMarkers = this.fbService.getArticlesStateOrderFilter('', params['id'].split(','))


    // });

  }
  ngOnInit() {
    this.markers.umMarkers = this.navItems
    //  this.queryParams.pipe(
    //   switchMap(ids => this.navItems.pipe(
    //     tap(data => console.log('ids', data)),

    //     map((articles: any[]) => {
    //       if (this.disabled) {
    //         return articles.filter(article =>
    //           // article.id == '-MDW1Oss0vwq_ZS6IIHR'
    //           ids.indexOf(article.id) > -1
    //         )
    //       }
    //       return articles

    //     }),
    //     map((articles: any[]) => articles
    //       .map((article: any) => {
    //         article.options = {
    //           icon: article.marker.icon,
    //           // icon: 'https://firebasestorage.googleapis.com/v0/b/umgorod-4ae1a.appspot.com/o/marker5.png?alt=media&token=d414a82c-d47f-4d0f-8d55-67c95d6e8a17',
    //           animation: google.maps.Animation.DROP,
    //         }; return article
    //       })
    //     ),
    //     tap(data => console.log('data2', data))

    //   ))

    // )



  }
  // setMarkers() {

  //   this.navItems.pipe(
  //     tap(data => console.log('data1', data)),
  //     map((articles: any[]) => {
  //       if (this.disabled) {
  //         return articles.filter(article =>
  //           // article.id == '-MDW1Oss0vwq_ZS6IIHR'
  //           this.queryParams.value.indexOf(article.id) > -1
  //         )
  //       }
  //       return articles

  //     }),
  //     map((articles: any[]) => articles
  //       .map((article: any) => {
  //         article.options = {
  //           icon: article.marker.icon,
  //           // icon: 'https://firebasestorage.googleapis.com/v0/b/umgorod-4ae1a.appspot.com/o/marker5.png?alt=media&token=d414a82c-d47f-4d0f-8d55-67c95d6e8a17',
  //           animation: google.maps.Animation.DROP,
  //         }; return article
  //       })
  //     ),
  //     tap(data => console.log('data2', data))

  //   ).subscribe(data => this.obs.next(data))
  // }

  onClickAllGroup(checked) {
    if (checked) {
      this.router.navigate(['map'], { queryParams: { 'filter': this.queryParams.join(',') } })
      this.markers.filterOf = false
    }
    else {
      this.router.navigate(['map'])
      this.markers.filterOf = true
    }

    // this.setMarkers()
    // this.queryParams.next(this.queryParams.value)
  }
  onClickOptGroup(items) {
    this.router.navigate(['map'], { queryParams: { 'filter': this.queryParams.join(',') } })

  }
  onClickMatOption(checked, id: any) {
    if (checked) (this.queryParams.splice(-1, 0, id))
    else this.queryParams.splice(this.queryParams.indexOf(id), 1)
    this.router.navigate(['map'], { queryParams: { 'filter': this.queryParams.join(',') } })
    // this.setMarkers()
    // this.queryParams.next(this.queryParams.value)
  }

  updateAllComplete(group) {
    group.completed = group.value != null && group.value.every(t => t.completed);
  }

  someComplete(group): boolean {

    if (group.value == null) {
      return false;
    }
    group.completed = group.value != null && group.value.every(t => t.completed);
    return group.value.filter(item => item.completed).length > 0 && !group.completed;
  }

  setAll(checked: boolean, group) {
    // this.onClickOptGroup(group.value)

    group.completed = checked;
    if (group.value == null) {
      return;
    }
    group.value.forEach(t => {
      t.completed = checked
      // let index = this.queryParams.indexOf(t.id)
      // if (index > -1) this.queryParams.splice(index, 1)
      // else this.queryParams.push(t.id)
      if (checked && this.queryParams.indexOf(t.id) == -1) this.queryParams.splice(-1, 0, t.id)
      else if (!checked) this.queryParams.splice(this.queryParams.indexOf(t.id), 1)
      // this.setMarkers()
      // this.queryParams.next(this.queryParams.value)



    }
    )
  }
}
