import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { GoogleMapsModule } from '@angular/google-maps'

import { environment} from '../environments/environment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MapComponent } from './Sections/map/map.component';
import { HeaderComponent } from './Header/header.component';
import { AdminComponent } from './Sections/Admin/admin.component'
import { AuthService } from './auth.service';
import { TokenStorageService } from './token-storage.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule} from '@angular/fire'
import { AngularFireDatabaseModule} from '@angular/fire/database'
import { AngularFireStorageModule} from '@angular/fire/storage';
import { MainComponent } from './Sections/main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from './shared/material.module';

import { PartnersComponent } from './Sections/Admin/partners/partners.component';
import { IdeasEditComponent } from './Sections/Admin/ideas-edit/ideas-edit.component';

import { UploadEditComponent } from './Sections/Admin/upload-edit/upload-edit.component';
import { PartnersEditComponent } from './Sections/Admin/partners-edit/partners-edit.component';
import { PeopleEditComponent } from './Sections/Admin/people-edit/people-edit.component';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ArticlesMainComponent } from './Sections/Admin/articles/articles-main.component';
import { CkeditorComponent } from './Sections/Admin/articles/ckeditor/ckeditor.component';
import { ArticlesListComponent } from './Sections/Admin/articles/articles-list/articles-list.component';
import { ArticlesSearchComponent } from './Sections/Admin/articles/articles-list/articles-search/articles-search.component';
import { ArticlesCreateComponent } from './Sections/Admin/articles/articles-list/articles-create/articles-create.component';
import { FireBaseService } from './shared/fireBase.service';
import { AboutComponent } from './Sections/about/about.component';
import { SanitizeHtmlPipe } from './shared/sanitizeHtmlPipe.pipe';
import { CitiesComponent } from './Sections/cities/cities.component';
// import {NgPipesModule} from 'ngx-pipes';
import { NgAggregatePipesModule } from 'angular-pipes';
import { NgGroupByPipeModule } from 'angular-pipes';
import { NgToArrayPipeModule } from 'angular-pipes';
import { NgMapPipeModule } from 'angular-pipes';
import { ConsolePipe } from './shared/consolePipe.pipe';
import { NgPluckPipeModule } from 'angular-pipes';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    HeaderComponent,
    AdminComponent,
    MainComponent,
    PartnersComponent,
    IdeasEditComponent,
    UploadEditComponent,
    PartnersEditComponent,
    PeopleEditComponent,
    ArticlesMainComponent,
    CkeditorComponent,
    ArticlesListComponent,
    ArticlesSearchComponent,
    ArticlesCreateComponent,
    AboutComponent,
    SanitizeHtmlPipe,
    ConsolePipe,
    CitiesComponent
  ],
  entryComponents: [CkeditorComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    GoogleMapsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    CKEditorModule,
    // NgAggregatePipesModule,
    NgGroupByPipeModule,
    NgToArrayPipeModule,
    NgMapPipeModule,
    NgPluckPipeModule

  ],
  providers: [
      TokenStorageService,
      AuthService,
      FireBaseService
     
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
