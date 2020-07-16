import { Component, OnInit, Injectable, Input, Inject, Optional } from '@angular/core';

// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import * as Editor from '../../../shared/ckeditor'
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
// import * as ClassicEditor2 from '@ckeditor/ckeditor5-upload/src/filerepository';
// import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import * as DocumentEditor from '../../../../../assets/js/ck-editor-document-fireBase/ckeditor.js';
import { AngularFireStorage } from '@angular/fire/storage';
import { FireBaseService, url } from 'src/app/shared/fireBase.service';
import { finalize, take } from 'rxjs/operators';
import { promise } from 'protractor';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DateAdapter } from '@angular/material/core';


@Component({
  selector: 'app-ckeditor',
  templateUrl: './ckeditor.component.html',
  styleUrls: ['./ckeditor.component.css'],


})

export class CkeditorComponent implements OnInit {
  article

  public html: any
  public Editor = DocumentEditor;
  public model;
  ckconfig = {
    extraPlugins: [this.TheUploadAdapterPlugin]
  };
  formItems: FormGroup
  controls: string[]

  constructor(
    public dialogRef: MatDialogRef<CkeditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, //Обязательные данные при запуске . node + actionName
    private fireBaseService: FireBaseService,
    private formBuilder: FormBuilder,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.dateAdapter.setLocale('en-GB');
  }

  ngOnInit(): void {
    this.model = { editorData: this.data.html }
    this.formItems = this.formBuilder.group(this.data)
    this.controls = Object.keys(this.data)

    // Подписываемся на изменения полей

    this.formItems.valueChanges.pipe(
    )
      .subscribe(change => {
        if (change.date) this.formItems.value.date = this.formItems.value.date.valueOf().toString()
        if (change.order) this.formItems.value.order = this.formItems.value.order.valueOf().toString()
      }
      )


  }



  //CKEditor
  public onChange({ editor }: ChangeEvent) {

    if (!editor) return
    this.formItems.value.html = editor.getData();


    // console.log(data);
    // console.log(this.model.editorData);
  }
  public onReady(editor) {

    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement())
    this.TheUploadAdapterPlugin(editor)

  }

  TheUploadAdapterPlugin(editor) {

    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return new MyUploadAdapter(loader, this.fireBaseService,);
    };

  }
  save() {
    this.dialogRef.close(this.formItems.value);
  }
}


// @Injectable({ providedIn: 'root' })
export class MyUploadAdapter {
  // your adapter communicates to CKEditor through this
  // url;
  urlImage
  constructor(
    public loader,
    public uploadService: FireBaseService,
  ) {
  }
  // Метод загрузки на сервер
  upload() {
    return this.loader.file
      .then(file => new Promise((resolve, reject) => {
        this._initListeners(resolve, reject, file);
      }));
  }
  // Initializes XMLHttpRequest listeners.
  _initListeners(resolve, reject, file) {
    console.log('file',file);
    
    this.uploadService.uploadData({}, file, file.name).then((url) => {
      resolve({
        default: url
      })
    }
    )

  }
  abort() {
  }




}
