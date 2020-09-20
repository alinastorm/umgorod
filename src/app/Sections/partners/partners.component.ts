import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css']
})
export class PartnersComponent {

  articles
  constructor(
    public firedb: AngularFireDatabase,
  ) {
    this.articles = firedb.list('articles').valueChanges() 
   }

}
