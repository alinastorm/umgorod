import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { FireBaseService } from 'src/app/shared/fireBase.service';
import { Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  articles
  
  constructor(
    public firedb: AngularFireDatabase,
    public fbService: FireBaseService ,
  ) {   
    this.articles = fbService.getArticlesStateOrderFilter({'order':false})
    
   }



}
