import { Component, ViewChild, ElementRef, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FireBaseService } from '../shared/fireBase.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import {KeysPipe} from 'ngx-pipes/src/ng-pipes/pipes/object/keys';




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  // providers: [KeysPipe]
})
export class HeaderComponent {
  hiddenBurger = true
  array = []
  collapsed = true;
  
  currentUser: ReplaySubject<any>// отслеживается авторизирован пользователь или нет
  articles: Observable<any>
  articles2
  

  constructor(
    private authService: AuthService,
    
    private router: Router,
    public fbService: FireBaseService,
    public dialog: MatDialog
  ) {
    this.currentUser = this.authService.currentUser$
    // this.articles = fbService.getArticlesStateOrderFilter({'city':false})
    fbService.getArticlesStateOrderFilter({ 'city': false })
    this.articles = fbService.getArticlesStateOrderFilter({ 'city': false })
    // .subscribe((data:Array<any>) => { console.log("++++++++", data[0],data); this.articles =data })

    // [{ city: 1, id: 2 }, { city: 2, id: 3 }] 

    this.articles2 = fbService.getArticlesStateOrderFilter({ 'city': false })
   
  }

  ngOnInit() { 
  }

  openDialog(){
    
    const dialogRef = this.dialog.open(DialogLogin, {
      width: '250px',
      data: {name: '', animal: ''},
      restoreFocus: false
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   // this.animal = result;
    // });
  }




  

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialogLogin.component.html',
})
export class DialogLogin {

  formLogin: FormGroup;
  inputEmail: FormControl;
  inputPassword: FormControl;
  @ViewChild('closeModal') closeModal: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<DialogLogin>,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}


    ngOnInit(){
         // используя form builder создаем валидатор заполненного значения
    this.inputEmail = this.formBuilder.control('', Validators.required);
    this.inputPassword = this.formBuilder.control('', Validators.required);

    // используя form builder создаем группу с форм контролами email password и насадим их в html через formControlName=""
    this.formLogin = this.formBuilder.group({
      email: this.inputEmail,// 
      password: this.inputPassword,// 
    })
    }
  onNoClick(): void {
    this.dialogRef.close();
  }

  public authWithEmailAndPassword() {
    // Отключаем поля и кнопку формы пока не придет ответ
    this.formLogin.disable()

    // Промис на получение токена от сервера
    this.authService.SignIn(this.formLogin.value)
      //Resolve
      .then((result) => {
        // this.closeModal.nativeElement.click();
        this.dialogRef.close();
      })
      //Reject
      .catch((error) => {
        this.formLogin.enable()
        if (error.code == "auth/wrong-password") {
          this.formLogin.get('password').setErrors(error)
        }
        if (error.code == "auth/user-not-found") {
          this.formLogin.get('email').setErrors(error)
        }
        this.setFieldsFormLoginErrors(error);
      })
  }

    //функция для отображения ошибки при неудачной авторизации
    private setFieldsFormLoginErrors(errors) {
      this.formLogin.setErrors({
        errors: errors
      })
    }

}

export interface DialogData {
  login: string;
  password: string;
}