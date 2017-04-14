import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFire, AngularFireAuth, FirebaseListObservable, AuthProviders, AuthMethods } from 'angularfire2';
import { NgControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // @Input() nextPage: string;
  @Output() loginSuccess = new EventEmitter<boolean>();
  msg: string;
  constructor(private af: AngularFire, private router: Router)
  { }

  ngOnInit() {
  }

  login(email: NgControl, password: NgControl) {
    this.msg = "Logging in...";
    this.af.auth.login({ email: email.value, password: password.value }, { provider: AuthProviders.Password, method: AuthMethods.Password }).then(
      resolved => {
        this.loginSuccess.emit(true);
        this.msg = "Logged in!";
      },
      rejected => {
        this.loginSuccess.emit(false);
        this.msg = rejected.message;
      }
    ).catch(Error => {
      this.msg = Error.message;
      this.loginSuccess.emit(false);
    })
  }

  logout() {
    this.af.auth.logout().then(
      resolved => { this.loginSuccess.emit(false); }
    )
  }
}
