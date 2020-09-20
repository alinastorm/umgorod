import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';



@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  // encapsulation: ViewEncapsulation.None,
})
export class AboutComponent {
  articles
  constructor(
    public firedb: AngularFireDatabase,
  ) {
    this.articles = firedb.list('articles').valueChanges() 
   }


}
