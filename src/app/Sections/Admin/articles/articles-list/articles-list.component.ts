import { Component, OnInit, Input, SimpleChanges, OnDestroy } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FireBaseService } from 'src/app/shared/fireBase.service';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { CkeditorComponent } from '../ckeditor/ckeditor.component';
import { MatDialog } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';

import { DateAdapter } from '@angular/material/core';


@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css'],
  providers: []
})
export class ArticlesListComponent implements OnInit {

  private _data2
  formEditArticle: FormGroup
  articles$
  step
  private subscribtion = new Subscription

  constructor(
    private fireStorage: AngularFireStorage,
    private fireBaseService: FireBaseService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public overlay: Overlay,
    private dateAdapter: DateAdapter<Date>

  ) {
    this.articles$ = this.fireBaseService.getArticlesStateOrderFilter()
    this.dateAdapter.setLocale('en-GB');
    // this.fireBaseService.getArticlesStateOrderFilter().subscribe(() => this.step = null)//раскрытие открытой строки после переоткрытия
  }

  ngOnInit(): void {
    // this.formEditArticle = this.formBuilder.group({
    //   order: new FormControl("",),// 
    //   date: new FormControl("",),// 
    //   nameArticle: new FormControl("", [Validators.required]),// 
    //   city: new FormControl("",),// 
    //   human: new FormControl("",),// 
    //   idea: new FormControl("",),//      
    // })
    // this.formEditArticle.disable()

  }
  ngOnChanges(changes: SimpleChanges) {
    // this.fireBaseService.getArticlesStateOrderFilter()

    // .pipe(tap((data=>console.log('data',data)))) 
    // changes.prop contains the old and the new value...
  }
  ///аккордеон

  getDate(value) {

    return new Date(+value)

  }
  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  addArticle2(article) {
    this.fireBaseService.addArticle(article)

  }

  updateArticle2(article) {
    // this.fireBaseService.updateArticle(article, article)

  }
  editHTMLArticle(article) {
    let dialogRef = this.dialogOpen(article);
    dialogRef.afterClosed()
      .subscribe((result: any) => {
   
        
        if (!result) return
        this.fireBaseService.updateArticle(result.id, result)
        
        // this.fireBaseService.addArticle(result)
      })
  }


  dialogOpen(item) {
    return this.dialog.open(CkeditorComponent, {
      autoFocus: false, restoreFocus: false, hasBackdrop: false, panelClass: item.id, maxHeight: '90vh',
      data: item, scrollStrategy: this.overlay.scrollStrategies.noop()
    });

  }



}
