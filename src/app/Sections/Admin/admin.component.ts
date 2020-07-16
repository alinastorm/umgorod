import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent  {

  constructor(
    private router: Router,
  ) { }

asd(){
  console.log('test1')
  this.router.navigate(['category'])
}

}
