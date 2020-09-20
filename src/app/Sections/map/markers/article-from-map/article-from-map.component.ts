import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-article-from-map',
  templateUrl: './article-from-map.component.html',
  styleUrls: ['./article-from-map.component.css']
})
export class ArticleFromMapComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public article: any, //Обязательные данные при запуске . node + actionName

  ) { }

  ngOnInit(): void {
  }

}
