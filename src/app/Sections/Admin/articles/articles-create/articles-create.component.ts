import { Component, OnInit, Injectable, ViewChild } from '@angular/core';

// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import * as Editor from '../../../shared/ckeditor'
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
// import * as ClassicEditor2 from '@ckeditor/ckeditor5-upload/src/filerepository';
// import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
// import * as DocumentEditor from '../../../../assets/js/ck-editor-document-fireBase/ckeditor.js';
import { AngularFireStorage } from '@angular/fire/storage';
import { FireBaseService, url } from 'src/app/shared/fireBase.service';
import { finalize, take } from 'rxjs/operators';
import { promise } from 'protractor';
import { CkeditorComponent } from '../ckeditor/ckeditor.component';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';

@Component({
  selector: 'app-articles-create',
  templateUrl: './articles-create.component.html',
  styleUrls: ['./articles-create.component.css'],

})
export class ArticlesCreateComponent implements OnInit {


  article = {

    order: '',
    date: '',
    nameArticle: '',
    city: '',
    human: '',
    topic: '',
    html: '',
    marker: {
      title: '',
      html: '',
      position: {
        lat: '',
        lng: ''
      },
      icon: 'https://firebasestorage.googleapis.com/v0/b/umgorod-4ae1a.appspot.com/o/logo6.png?alt=media&token=e7ea3942-599c-4fd6-b9c9-62c506748416',
    },
    partners:'',
    about: '',
    contacts:''

  }
  // formAddArticle: FormGroup
  // order: FormControl
  // date: FormControl
  // nameArticle: FormControl
  // city: FormControl
  // human: FormControl
  // idea: FormControl
  // html: FormControl




  constructor(
    private fireBaseService: FireBaseService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public overlay: Overlay
  ) {


  }

  ngOnInit(): void {

    // // используя form builder создаем controls
    // this.order = this.formBuilder.control('',);
    // this.date = this.formBuilder.control(new Date(), Validators.required);
    // this.nameArticle = this.formBuilder.control('', Validators.required);
    // this.city = this.formBuilder.control('', Validators.required);
    // this.human = this.formBuilder.control('', Validators.required);
    // this.idea = this.formBuilder.control('', Validators.required);

    // используя form builder создаем группу с форм контролами и насадим их в html через formControlName=""
    // this.formAddArticle = this.formBuilder.group({
    //   order: new FormControl("", [Validators.required]),// 
    //   date: new FormControl("",),// 
    //   nameArticle: new FormControl("",),// 
    //   city: new FormControl("",),// 
    //   human: new FormControl("",),// 
    //   idea: new FormControl("",),//      
    //   html: new FormControl("",),//      
    // })

  }

  editHTMLArticle() {

  }
  addArticle() {
    let dialogRef = this.dialogOpen(this.article);
    dialogRef.afterClosed()
      .subscribe((result: any) => {
        if (!result) return
        this.fireBaseService.addArticle(result)
        this.fireBaseService.updateArticlesOrderFilter()
      })
  }
  dialogOpen(item) {
    return this.dialog.open(CkeditorComponent, {
      autoFocus: false,
      restoreFocus: false,
      hasBackdrop: false,
      panelClass: item.id,
      maxHeight: '90vh',
      data: {
        item,
        ckeditor: false
      },
      scrollStrategy: this.overlay.scrollStrategies.noop(),

    });

  }


}
