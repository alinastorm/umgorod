import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {

  articles
  constructor(
    public firedb: AngularFireDatabase,
  ) {
    this.articles = firedb.list('articles').valueChanges() 
   }

  ngOnInit(): void {
  
  }

}
