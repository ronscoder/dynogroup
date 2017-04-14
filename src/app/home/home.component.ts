import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { DataServiceService } from '../data-service.service';
import { animations } from '../animations';
import { FirebaseListObservable } from 'angularfire2';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  animations: animations
})
export class HomeComponent implements OnInit {
  carousal_images: FirebaseListObservable<any[]>;
  highlight_images: FirebaseListObservable<any[]>;
  visionText = "";
  constructor(
    private http: Http,
    private data: DataServiceService,

  ) { }
  ngOnInit() {
    this.carousal_images = this.data.getSiteImages("carousal");
    this.highlight_images = this.data.getSiteImages("home_highlights");

    this.data.getVisionText().subscribe((value) => {
      this.visionText = value;
    });
  }
  hover = "off";
  onmouseenter() {
    this.hover = this.hover === "off" ? "on" : "off";
  }

}
