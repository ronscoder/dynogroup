import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { DataServiceService } from '../data-service.service';
import { animations } from '../animations';
import { Observable } from 'rxjs/Rx';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  animations: animations
})
export class HomeComponent implements OnInit {
  loadingStatus = {
    carousal: { isLoading: true, text: 'Loading...' },
    highlights: { isLoading: true, text: 'Loading...' },
    carousalImages: [],
    highlightImages: []
  };

  hover = 'off';
  carousal_images: Observable<any[]>;
  highlight_images: Observable<any[]>;
  visionText = '';
  highlights: FirebaseListObservable<any[]>;
  // = [
  //   { comp: 'survey', group: '', limit: 1 },
  //   { comp: 'gallery', group: 'pd', limit: 1 },
  // ];
  constructor(
    private http: Http,
    private data: DataServiceService,
    private af: AngularFire
  ) { }
  ngOnInit() {
    this.carousal_images = this.data.getSiteImages('carousal');
    // .filter(val => {
    //   return val.deleted !== true;
    // });
    this.carousal_images.subscribe(res => {
      this.loadingStatus.carousal.isLoading = false;
    }, error => {
      this.loadingStatus.carousal.isLoading = false;
      this.loadingStatus.carousal.text = 'Failed:' + error;
    });
    // this.highlight_images = this.data.getSiteImages('highlights');
    // .filter(val => {
    //   return val.deleted !== true;
    // });
    this.highlights = this.af.database.list('/gallerymeta', {
      query: {
        orderByChild: 'highlight',
        equalTo: true
      }
    });
    this.highlights.subscribe(res => {
      this.loadingStatus.highlights.isLoading = false;
    }, error => {
      this.loadingStatus.highlights.isLoading = false;
      this.loadingStatus.highlights.text = 'Failed:' + error;
    });
    this.data.getVisionText().subscribe((value) => {
      this.visionText = value;
    });
  }

  onmouseenter() {
    this.hover = this.hover === 'off' ? 'on' : 'off';
  }

  onLoadImage(imgRef, imgNumber: number) {
    imgRef[imgNumber] = false;
  }

}
