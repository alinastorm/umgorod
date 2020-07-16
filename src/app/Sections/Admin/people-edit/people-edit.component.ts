import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { FireBaseService } from 'src/app/shared/fireBase.service';

@Component({
  selector: 'app-people-edit',
  templateUrl: './people-edit.component.html',
  styleUrls: ['./people-edit.component.css']
})
export class PeopleEditComponent implements OnInit {
  public categories:any

  constructor(
    private db: AngularFireDatabase,
    private uploadService: FireBaseService
    
  ) {
    this.categories = uploadService.getCategoryList().valueChanges()
    
   }

  ngOnInit(): void {
    this.uploadService.insertDefaultCategory()
  }

}
