import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Http } from '@angular/http';
import { DataServiceService } from '../data-service.service';
import { AngularFire, AngularFireAuth, FirebaseListObservable, AuthProviders, AuthMethods } from 'angularfire2';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  isSignedIn = false;
  userEmail = '';
  public alerts: any = [];
  @ViewChild(LoginComponent)
  private LoginComponent: LoginComponent;

  constructor(
    private http: Http,
    private data: DataServiceService,
    private af: AngularFire
  ) { }
  ngOnInit() {
    this.af.auth.subscribe(
      auth => {
        if (auth) {
          this.isSignedIn = true;
        }
      }
    );
  }

  public alertMe(): void {
    setTimeout(function (): void {
      alert('You\'ve selected the alert tab!');
    });
  }

  logout() {
    this.af.auth.logout();
    // this.LoginComponent.logout();
    this.isSignedIn = false;
  }

  loginSuccess(success: boolean) {
    console.log('login status:' + success);
    this.isSignedIn = success;
  }
}
