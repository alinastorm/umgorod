import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { FireBaseService } from 'src/app/shared/fireBase.service';

@Component({
  selector: 'app-upload-edit',
  templateUrl: './upload-edit.component.html',
  styleUrls: ['./upload-edit.component.css']
})
export class UploadEditComponent implements OnInit {

  imgs: Observable<any>
  imgSrc: string;
  selectedImage: any = null
  
  formTemplate = new FormGroup({
    imageUrl: new FormControl('', Validators.required),
    category: new FormControl('')
  })
  categories: any
  categoryGroups = [
    {
      name: 'Умные люди',
      values: [
        { value: 'bulbasaur-0', viewValue: 'Все', lat: 53.9905917, lng: 28.3099033, zoom: 4 },
        { value: 'oddish-1', viewValue: 'Брест', lat: 1, lng: 2, zoom: 11 },
        { value: 'bellsprout-2', viewValue: 'Гомель', lat: 52.440032, lng: 30.986037, zoom: 12 },
        { value: 'bellsprout-2', viewValue: 'Минск', lat: 53.8846196, lng: 27.5233293, zoom: 11 }
      ]
    },
    {
      name: 'Партнеры',
      disabled: true,
      values: [
        { value: 'charmander-6', viewValue: 'Москва', lat: 1, lng: 2, zoom: 11 },
        { value: 'vulpix-7', viewValue: 'Смоленск', lat: 1, lng: 2, zoom: 11 },
        { value: 'flareon-8', viewValue: 'Владимир', lat: 1, lng: 2, zoom: 11 }
      ]
    }
  ];

  constructor(
    private db: AngularFireDatabase,
    private fs: AngularFireStorage,
    private uploadService: FireBaseService
  ) {
    this.imgs = uploadService.getImageDetailListFS().valueChanges()
    this.categories = uploadService.getCategoryList().valueChanges()

  }

  ngOnInit(): void {
    this.formReset()
  }
  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0].type == 'image/png' || event.target.files && event.target.files[0].type == "image/jpeg") {
      const reader = new FileReader
      reader.onload = (e: any) => this.imgSrc = e.target.result
      reader.readAsDataURL(event.target.files[0])
      this.selectedImage = event.target.files[0]
    } else {
      this.imgSrc = '/assets/upload.jpg'
      this.selectedImage = null

    }
  }
  onSubmit(formValue) {
  

    if (this.formTemplate.valid) {
      this.uploadService.uploadData(formValue, this.selectedImage, this.selectedImage.name).then(() => this.formReset())
    }
  }

  onChangeCategory() {

  }
  formReset() {
    this.imgSrc = '/assets/upload.jpg'
    this.formTemplate.reset()
  }
onDelete(img){
this.uploadService.deleteFileFS(img.imageUrl)

}

}
