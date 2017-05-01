import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { DataServiceService } from '../../data-service.service';

@Component({
  selector: 'app-image-by-year',
  templateUrl: './image-by-year.component.html',
  styleUrls: ['./image-by-year.component.css']
})
export class ImageByYearComponent implements OnInit {
  imagePagelocation = 'survey';
  imageList: FirebaseListObservable<any[]>;
  surveyData = [];
  isLoading = true; // Fetching image data
  yearIndex = 0;
  modalFigure: any;

  constructor(
    private db: DataServiceService,
    private af: AngularFire
  ) { }

  ngOnInit() {
    this.imageList = this.db.getSiteImages(this.imagePagelocation);
    // console.log(this.imageList.toArray())
    this.imageList.subscribe(
      resolve => {
        console.log(resolve.values());
        this.isLoading = false;
      }
    );
    this.imageList.$ref.on('value', (datasnap) => {
      this.surveyData = [];
      const values = datasnap.val();
      // console.log(values);
      const keys = Object.keys(values);
      for (const key of keys) {
        const value = values[key];
        const imgKeys = Object.keys(value.images);
        const images = [];
        if (!value['deleted']) {
          for (const key1 of imgKeys) {
            if (!value.images[key1]['deleted']) {
              images.push({ key: key1, content: value.images[key1] });
            }
          }
          this.surveyData.push({
            key: key,
            info: value,
            images: images
          });
        }
      }
    });
  }

}
