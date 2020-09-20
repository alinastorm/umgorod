import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { FireBaseService } from 'src/app/shared/fireBase.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent {

  navItems
  elements

  constructor(
    public firedb: AngularFireDatabase,
    public fbService: FireBaseService,

  ) {
    this.navItems = firedb.list('articles').valueChanges()
    this.elements = fbService.getArticlesStateOrderFilter({ 'articles': false })
  }

  // onClickOptGroup(OptGroup) {
  //   this.elements = this.fbService.getArticlesStateOrderFilter({ 'people': OptGroup })
  // }

  onClickMatOption(id?) {
    if (!id) this.elements = this.fbService.getArticlesStateOrderFilter({ 'articles': false })
    this.elements = this.fbService.getArticlesStateOrderFilter({ 'id': id })
    // this.drawer.toggle()
  }

}
