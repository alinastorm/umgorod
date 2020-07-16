import { Component } from '@angular/core';
import { Observable, BehaviorSubject, of, Subject } from 'rxjs';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public city: Subject<any>;
  constructor() {
    // this.city = new BehaviorSubject("")
    // setTimeout(() => {
    //   this.city.next("sasa")
    // }, 1000);
  }
}