import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AngularFire, AngularFireAuth, FirebaseListObservable, AuthProviders, AuthMethods, FirebaseAuthState } from 'angularfire2';
import { NgControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // @Input() nextPage: string;
  loggingIn = false;
  @Output() loginSuccess = new EventEmitter<boolean>();
  msg: string;
  email: string;
  pass: string;
  constructor(
    private af: AngularFire,
    private router: Router
  ) { }

  ngOnInit() {
    /**
     * Try login from cache
     */
    // this.af.auth.subscribe(
    //   auth => {
    //     if (auth) {
    //       this.loginSuccess.emit(true);
    //     } else {
    // if (!environment.production) {
    //   this.loginSuccess.emit(true);
    // }
    // TODO: REmove the line below
    // this.loginSuccess.emit(true);
    this.email = sessionStorage.getItem('email');
    this.pass = sessionStorage.getItem('pass');
    //   if ((email && pass)) {
    //     console.log(email);
    //     console.log(pass);
    //     this.login(email, pass);
    //   }
    // }
    // }
    // );
  }

  login(email: string, password: string) {

    this.loggingIn = true;
    // this.msg = 'Logging in...';

    this.af.auth.login({ email: email, password: password },
      { provider: AuthProviders.Password, method: AuthMethods.Password }).then(
      resolved => {
        this.loginSuccess.emit(true);
        this.msg = 'Logged in!';
        sessionStorage.setItem('email', email);
        // console.log(password);
        sessionStorage.setItem('pass', password);
      },
      rejected => {
        this.loginSuccess.emit(false);
        this.msg = rejected.message;
      }
      ).catch(Error => {
        this.msg = Error.message;
        this.loginSuccess.emit(false);
      });
  }

  logout() {
    this.af.auth.logout().then(
      resolved => { this.loginSuccess.emit(false); }
    );
  }
}
