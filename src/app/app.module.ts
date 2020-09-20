import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { GoogleMapsModule } from '@angular/google-maps'

import { environment} from '../environments/environment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MapComponent } from './Sections/map/map.component';
import { HeaderComponent, DialogLogin } from './Header/header.component';
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

// import { IdeasEditComponent } from './Sections/Admin/ideas-edit/ideas-edit.component';

import { UploadEditComponent } from './Sections/Admin/upload-edit/upload-edit.component';
import { PartnersEditComponent } from './Sections/Admin/partners-edit/partners-edit.component';
import { PeopleEditComponent } from './Sections/Admin/people-edit/people-edit.component';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ArticlesMainComponent } from './Sections/Admin/articles/articles-main.component';
import { CkeditorComponent } from './Sections/Admin/articles/ckeditor/ckeditor.component';
import { ArticlesListComponent } from './Sections/Admin/articles/articles-list/articles-list.component';
import { ArticlesSearchComponent } from './Sections/Admin/articles/articles-search/articles-search.component';
import { ArticlesCreateComponent } from './Sections/Admin/articles/articles-create/articles-create.component';
import { FireBaseService } from './shared/fireBase.service';
import { AboutComponent } from './Sections/about/about.component';
import { SanitizeHtmlPipe } from './shared/sanitizeHtmlPipe.pipe';
import { CitiesComponent } from './Sections/cities/cities.component';

// import {NgPipesModule} from 'ngx-pipes';
import { NgAggregatePipesModule } from 'angular-pipes';
import { NgGroupByPipeModule } from 'angular-pipes';
import { NgToArrayPipeModule } from 'angular-pipes';
import { NgMapPipeModule } from 'angular-pipes';
import { NgPluckPipeModule } from 'angular-pipes';
import { ConsolePipe } from './shared/consolePipe.pipe';
import { AsyncGrouPipe } from './shared/asyncGroupByPipe.pipe';
import { CityComponent } from './Sections/cities/city/city.component';
import { FooterComponent } from './footer/footer.component';
import { PeopleComponent } from './Sections/people/people.component';
import { HumanComponent } from './Sections/people/human/human.component';
import { TopicsComponent } from './Sections/topics/topics.component';
import { TopicComponent } from './Sections/topics/topic/topic.component';
import { MarkersComponent } from './Sections/map/markers/markers.component';
import { MapeditorComponent } from './Sections/Admin/articles/mapeditor/mapeditor.component';
import { ArticleFromMapComponent } from './Sections/map/markers/article-from-map/article-from-map.component';
import { ContactsComponent } from './Sections/contacts/contacts.component';
import { PartnersComponent } from './Sections/partners/partners.component';
// import { IdeasComponent } from './Sections/ideas/ideas.component';
// import { IdeaComponent } from './Sections/ideas/idea/idea.component';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    MarkersComponent,
    HeaderComponent,
    AdminComponent,
    MainComponent,
    // IdeasEditComponent,
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
    AsyncGrouPipe,
    CitiesComponent,
    DialogLogin,
    CityComponent,
    FooterComponent,
    PeopleComponent,
    HumanComponent,
    // IdeasComponent,
    // IdeaComponent,
    TopicsComponent,
    TopicComponent,
    MapeditorComponent,
    ArticleFromMapComponent,
    ContactsComponent,
    PartnersComponent
    
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
