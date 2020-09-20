import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent {
  articles
  constructor(
    public firedb: AngularFireDatabase,
  ) {
    this.articles = firedb.list('articles').valueChanges() 
   }

}
