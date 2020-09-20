import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FireBaseService } from 'src/app/shared/fireBase.service';

@Component({
  selector: 'app-human',
  templateUrl: './human.component.html',
  styleUrls: ['./human.component.css']
})
export class HumanComponent implements OnInit, OnDestroy {
  @Input() public elements: Observable<any>
  id: any;
  private subscription: Subscription;


  constructor(

    private activateRoute: ActivatedRoute,
    public fbService: FireBaseService
    
  ) {

    this.subscription = this.activateRoute.params.subscribe(params => this.id = params['id']);

  }

  ngOnInit(): void {
    if (this.id=='all') this.elements = this.fbService.getArticlesStateOrderFilter({ 'articles': false })
    else{
      this.elements = this.fbService.getArticlesStateOrderFilter({ 'id': this.id })
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
