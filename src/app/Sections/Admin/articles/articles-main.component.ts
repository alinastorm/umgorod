import { Component, OnInit, Injectable, ViewChild, Output } from '@angular/core';

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
import { CkeditorComponent } from './ckeditor/ckeditor.component';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';

@Component({
  selector: 'app-articles',
  templateUrl: './articles-main.component.html',
  styleUrls: ['./articles-main.component.css']
})
export class ArticlesMainComponent {


}
