import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms'
import { DataServiceService } from '../data-service.service';

import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {
  imagePagelocation = "survey";
  imageList: FirebaseListObservable<any[]>;
  images: any;
  // image: FirebaseListObservable<any>;
  saveError = '';
  isYearUpdate = false;
  isLoading = true; // Fetching image data
  isUpdating = false;
  imageToUpdate: any;

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
    // this.imageList.remove();
  }
  submitNewImage(imageData: NgForm) {
    // console.log(imageData.form.value)
    // console.log(imageData.value)
    this.saveError = '';
    let imageData1 = {
      location: imageData.value['location'],
      deleted: false,
      images: [{
        year: imageData.value['year'],
        image_url: imageData.value['image_url'],
        image_title: imageData.value['image_title'],
        image_subtext: imageData.value['image_subtext']
      }]
    };
    this.isUpdating = true;
    this.db.addSiteImage(this.imagePagelocation, imageData1).then(
      resolved => {
        // console.log(resolved);
        this.isUpdating = false;
      }, error => {
        this.saveError = error.message;
        this.isUpdating = false;
      }
    )
  }
  deleteSiteImage(imageToDelete: any) {
    /**
     * Soft delete
     */
    this.imageList.update(imageToDelete.$key, { deleted: true });
  }
  copyImage(formRef: NgForm, imageToCopy, index) {
    this.saveError = '';
    this.isYearUpdate = false;
    formRef.form.setValue({
      location: imageToCopy['location'],
      year: imageToCopy['images'][index]['year'],
      image_url: imageToCopy['images'][index]['image_url'],
      image_title: imageToCopy['images'][index]['image_title'],
      image_subtext: imageToCopy['images'][index]['image_subtext'],
    });
  }

  restore(imageToRestore: any) {
    this.imageList.update(imageToRestore.$key, { deleted: false });
  }

  updateImage(formRef: NgForm, imageToUpdate) {
    this.isYearUpdate = true;
    this.imageToUpdate = imageToUpdate;
    this.fillFormData(formRef, imageToUpdate);
  }

  fillFormData(formRef: NgForm, image) {
    formRef.form.setValue({
      year: (new Date()).getFullYear(),
      location: image['location'],
      image_url: '',
      image_title: '',
      image_subtext: ''
    });
  }

  formReset(formRef: NgForm) {
    this.isYearUpdate = false;
    formRef.reset();
  }

  UpdateNewImage(formRef: NgForm) {
    this.isUpdating = true;
    let imageLocation = this.imagePagelocation + '/' + this.imageToUpdate.$key + '/images';
    console.log(imageLocation);
    let imageData1 = {
      year: formRef.value['year'],
      image_url: formRef.value['image_url'],
      image_title: formRef.value['image_title'],
      image_subtext: formRef.value['image_subtext']
    };
    this.db.addSiteImage(imageLocation, imageData1).then(
      resolved => {
        this.isUpdating = false;
      },
      error => {
        this.isUpdating = false;
        this.saveError = error.message;
      });
  }
}
