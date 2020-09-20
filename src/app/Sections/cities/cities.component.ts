import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { FireBaseService } from 'src/app/shared/fireBase.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent {

  navItems
  elements
 
 

  constructor(
    public firedb: AngularFireDatabase,
    public fbService: FireBaseService,
    
  ) {
    this.navItems = firedb.list('articles').valueChanges() 
    this.elements = fbService.getArticlesStateOrderFilter({'articles':false})    
   }


  // onClickOptGroup(OptGroup){
  //   this.elements = this.fbService.getArticlesStateOrderFilter({'city':OptGroup})
  // }
  onClickMatOption(id?){
    if(!id)this.elements = this.fbService.getArticlesStateOrderFilter({'articles':false})
    this.elements = this.fbService.getArticlesStateOrderFilter({'id':id})
    // this.drawer.toggle()
  }

}
