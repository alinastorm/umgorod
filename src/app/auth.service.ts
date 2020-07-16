import { Injectable, OnInit } from '@angular/core';
import { of, Observable, ReplaySubject, throwError, BehaviorSubject, Subject } from 'rxjs';
// import { SHA1, enc } from 'crypto-js';
import { map, tap, catchError, publishReplay, refCount, take } from 'rxjs/operators';
import { TokenStorageService } from './token-storage.service';
import { Router } from '@angular/router';
import { error } from 'protractor';
import { AngularFireAuth } from '@angular/fire/auth';
// import { apiResponse } from '../main/main.service';
// import 'rxjs/add/observable/of';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public currentUser$: ReplaySubject<any> = new ReplaySubject<any>(1);
    public last_id_query: number;
    userData: any; // Save logged in user data
    constructor(
        private tokenStorageService: TokenStorageService,
        private router: Router,
        public  afAuth:  AngularFireAuth,
         
    ) { 

                      /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
        
          if (user) {
              this.userData = user;
              localStorage.setItem('user', JSON.stringify(this.userData));
              this.currentUser$.next(user);
          } else {
              this.currentUser$.next(null);
              localStorage.setItem('user', null);
                      }
        })


    }

    ////--Методы--////
    //// TODO: register(){}////



    // //// *Получение Токена на сервере по логину и паролю ////
    // getTokenByLogin(loginForm: LoginForm): Observable<Token> {
    //     const body = {
    //         email: loginForm.email,
    //         password: loginForm.password,
    //         returnSecureToken: true
    //     };

    //     this.afAuth.signInWithEmailAndPassword(loginForm.email, loginForm.password);
   

    //     return this.api.loginURL(body)
        
    // }

 // Sign in with email/password
 SignIn(loginForm: LoginForm) {
     
    return  this.afAuth.signInWithEmailAndPassword(loginForm.email, loginForm.password)
  
  }
    //   /////**Получаем Hash1 от логин в н.р. + пасс////
    //   getSHA1({ email, password }) {

    //     return SHA1((email.toLowerCase() + password)).toString(enc.Base64);
    //   }





}



// ***Интерфейсы//

export interface LoginForm {
    email: string,
    password: string

}
export interface Token {
    "kind": string,
    "localId": string,
    "email": string,
    "displayName": string,
    "idToken": string,
    "registered": true,
    "refreshToken": string,
    "expiresIn": number
}

export interface ActionLogin {
    async: false,
    action: 'login',
    hashlp: string
}
