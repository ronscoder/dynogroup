import { Component, ViewChild, Input, trigger, transition, state, style, animate, OnInit } from '@angular/core';
import { DataServiceService } from './data-service.service';
import { animations } from './animations';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:
  animations
})
export class AppComponent implements OnInit {
  public contacts = [];
  mouseOnLogo = 'off';
  constructor(
    private router: Router,
    private data: DataServiceService
  ) {
  }
  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });

    this.data.getContacts().subscribe(
      (res) => {
        // console.log(res);
        this.contacts = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onmouseenter() {
    this.mouseOnLogo = this.mouseOnLogo === 'off' ? 'on' : 'off';
  }

}

