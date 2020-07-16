import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FireBaseService } from 'src/app/shared/fireBase.service';
import { tap, map } from 'rxjs/operators';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-articles-search',
  templateUrl: './articles-search.component.html',
  styleUrls: ['./articles-search.component.css'],
  
})
export class ArticlesSearchComponent implements OnInit {
  data
  formSearch: FormGroup
  controls: string[]
  article = {
    order: '',
    date: '',
    nameArticle: '',
    city: '',
    human: '',
    idea: '',
    html: ''
  }
  controlSet: {}
 
  filterOpen: boolean = false

  constructor(
    private fireBaseService: FireBaseService,
    private formBuilder: FormBuilder,
  ) {
    
   }
  ngOnInit(): void {
    this.formSearch = this.formBuilder.group(this.article)
    this.controls = Object.keys(this.article)
   


    // Подписываемся на изменения полей
    this.formSearch.valueChanges.pipe(
      tap(() => {
        this.controlSet = null
        for (const control of this.controls) {

          if (!this.formSearch.get(control).value) {
            this.formSearch.get(control).disable({ onlySelf: true });
          } else {
            this.controlSet = { [control]: this.formSearch.get(control).value }
          }

        }
        if (!this.controlSet) {
          for (const control of this.controls) {
            this.formSearch.get(control).enable({ onlySelf: true });
          }
        }

      }),
      map((change)=>{
        if (change.date) this.controlSet['date'] = this.formSearch.value.date.valueOf().toString()
        if (change.order) this.controlSet['order'] = this.formSearch.value.order.toString()
      return change
      })
    )
      .subscribe((change:any) => {
      console.log("ArticlesSearchComponent -> ngOnInit -> data", change)
        if(change)this.fireBaseService.updateArticlesOrderFilter(this.controlSet)
        else this.fireBaseService.updateArticlesOrderFilter()
      } 
      )
    // for (const iterator of Object.keys(this.data)) {
    // }
  }

}
