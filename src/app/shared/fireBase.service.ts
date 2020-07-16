import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize, filter, map, tap, switchMap, exhaustMap, takeLast, takeUntil } from 'rxjs/operators';
import { Observable, BehaviorSubject, NextObserver } from 'rxjs';
import { FirebaseApp } from '@angular/fire';
import { FirebaseOperation } from '@angular/fire/database/interfaces';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class FireBaseService {
  public urlImage
  private articles$ = new BehaviorSubject<any[]>(null)
  private _filterSelect
  public number

  constructor(
    private firedb: AngularFireDatabase,
    private fireStor: AngularFireStorage
  ) {
    firedb.list('articles').valueChanges().subscribe(() => this.updateArticlesOrderFilter(this._filterSelect))
  }



  //Добавляем описание файла в realtimeDatabase для чтения списка файлов storage
  insertImageDetail(imageDetails) {
    this.firedb.list('imageDetails').push(imageDetails);
  }
  insertDefaultCategory() {
    // if (this.adb.list("category")) {
    //   return
    // }
    // this.adb.list('category').push( { name: 'main' })
    // this.adb.list('category').push( { name: 'people' })
    // this.adb.list('category').push( { name: 'ideas' })
    // this.adb.list('category').push( { name: 'partners' })


  }

  getArticlesStateOrderFilter(orderFilter?: {}): Observable<any> {

    // let filter = {[orderFilter]:orderFilter}
    this.updateArticlesOrderFilter(orderFilter)
    return this.articles$.asObservable()

    // return this.firedb.list("articles", (ref) => {
    //   if (filterSelect) {
    //     return ref.orderByChild(Object.keys(filterSelect)[0]).equalTo(filterSelect[Object.keys(filterSelect)[0]])
    //   } else {
    //     return ref
    //   }
    // }
  }

  public updateArticlesOrderFilter(filterSelect?: {}) {
    if (filterSelect) this._filterSelect = filterSelect//сохранение фильтра
    else this._filterSelect = null

    var articlesRef
    if (!this._filterSelect) {
      articlesRef = this.firedb.database.ref('articles')
    } else if (this._filterSelect[Object.keys(this._filterSelect)[0]]) {
      articlesRef = this.firedb.database.ref('articles').orderByChild(Object.keys(this._filterSelect)[0]).equalTo(this._filterSelect[Object.keys(this._filterSelect)[0]])
    } else if (Object.keys(this._filterSelect)[0]) {
      articlesRef = this.firedb.database.ref('articles').orderByChild(Object.keys(this._filterSelect)[0])

    }

    let mass = []
    articlesRef.once('value', function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        var childData = childSnapshot.val();
        childData.id = childSnapshot.key;
        mass.push(childData)
      });
    });



    this.articles$.next(mass)
  }
  getImageDetailListFS() {
    return this.firedb.list("imageDetails")
  }
  getCategoryList() {
    return this.firedb.list("category")
  }

  uploadData(formValue = {}, file, name) {
    //formValue структура которую пишем в realtimedatabase для последующего чтения list из storage
    //file файл для отправки в storage
    //name имя файла в storage

    var filePath = `${name}_${new Date().getTime()}`
    const fileRef = this.fireStor.ref(filePath)


    return this.fireStor.upload(filePath, file).snapshotChanges()
      .pipe(
        takeLast(1),
        switchMap((msg) => {
          console.log('msg', msg)
          return fileRef.getDownloadURL().pipe(map((url: any) => {
            formValue['imageUrl'] = url;
            this.insertImageDetail(formValue);
            this.urlImage = url
            fileRef.getMetadata
            return url
          })
          )
        }
        ),
        // map(() => { return { default: this.urlImage } }),
        // filter(_ => urlImage != undefined),
      ).toPromise()

    // console.log("UploadService -> uploadData -> this.urlImage", this.urlImage)
    // return ({ default: this.urlImage })
    // exhaustMap(() => {
    //  return fileRef.getDownloadURL().pipe(
    //     filter((url)=>!!url),
    //     map((url: any) => {
    //     console.log('-----------url-----------', url)
    //     formValue['imageUrl'] = url;
    //     this.insertImageDetail(formValue);
    //     this.urlImage = url
    //     return url
    //   })

    //   )
    // }
    // ),
    // map((url) => { return { default: url } }),
    // // filter(_ => urlImage != undefined),
    // tap((url) => console.log('urlImage-------------', url))


  }
  addArticle(article) {
    console.log("addArticle -> article", article)
    this.firedb.list('articles').push(article);
  }
  updateArticle(item: FirebaseOperation, data: Partial<any>) {
    console.log("updateArticle -> data", data)
    // this.firedb.list('articles').set(item, data)
    var updates = {};
    updates['articles/' + item] = data;
    this.firedb.database.ref().update(updates).then(() => this.updateArticlesOrderFilter())
  }
  deleteFileFS(filePath) {
    //Элементы database для удаления
    var childDataId = []
    //Ищем id элементов imageDetails которые соотвествуют отбору по равенству ссылки
    var imageDetailsRef = this.firedb.database.ref('imageDetails').orderByChild('imageUrl').equalTo(filePath)
    imageDetailsRef.once('value', function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        childDataId.push(childSnapshot.key)
      });
    })
    //Удаляем все найденные элементы
    childDataId.forEach((elem) => this.firedb.database.ref('imageDetails/' + elem).remove())

    //Удаляем сам файл из storage
    this.fireStor.storage.refFromURL(filePath).delete()
  }
}

export interface url {
  default: string
}