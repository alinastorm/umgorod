import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FireBaseService } from '../shared/fireBase.service';
// import {KeysPipe} from 'ngx-pipes/src/ng-pipes/pipes/object/keys';




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  // providers: [KeysPipe]
})
export class HeaderComponent {
  hiddenBurger= true
 array=[]
  collapsed = true;
  formLogin: FormGroup;
  inputEmail: FormControl;
  inputPassword: FormControl;
  currentUser: ReplaySubject<any>// отслеживается авторизирован пользователь или нет
  articles
  articles2
  @ViewChild('closeModal') closeModal: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    public fbService: FireBaseService ,
    // public keys: KeysPipe
  ) {
    this.currentUser = this.authService.currentUser$
    this.articles = fbService.getArticlesStateOrderFilter({'city':false})
    // fbService.getArticlesStateOrderFilter({'city':false}).subscribe((data)=>{console.log("HeaderComponent -> data", data);this.articles=data} )
    
    this.articles2 = fbService.getArticlesStateOrderFilter({'city':false})
  
  }

  ngOnInit() {
    // используя form builder создаем валидатор заполненного значения
    this.inputEmail = this.formBuilder.control('753464@gmail.com', Validators.required);
    this.inputPassword = this.formBuilder.control('0000sasa', Validators.required);

    // используя form builder создаем группу с форм контролами email password и насадим их в html через formControlName=""
    this.formLogin = this.formBuilder.group({
      email: this.inputEmail,// 
      password: this.inputPassword,// 
    })
  }


  public authWithEmailAndPassword() {
    // Отключаем поля и кнопку формы пока не придет ответ
    this.formLogin.disable()

    // Промис на получение токена от сервера
    this.authService.SignIn(this.formLogin.value)
      //Resolve
      .then((result) => {
        this.closeModal.nativeElement.click();
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
