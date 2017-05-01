import { Component, OnInit, Input } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms'
import { DataServiceService } from '../data-service.service';

import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {
  imagePagelocation = 'survey';
  imageList: FirebaseListObservable<any[]>;
  surveyData = [];
  // image: FirebaseListObservable<any>;
  saveError = '';
  isYearUpdate = false;
  isLoading = true; // Fetching image data
  isUpdating = false;
  imageToUpdate: any;
  imageUrl;
  constructor(
    private db: DataServiceService,
    private af: AngularFire
  ) { }

  ngOnInit() {
    this.imageList = this.db.getSiteImages(this.imagePagelocation);
    // console.log(this.imageList.toArray())
    this.imageList.subscribe(
      resolve => {
        // console.log(resolve.values());
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
        for (const key1 of imgKeys) {
          images.push({ key: key1, content: value.images[key1] });
        }
        this.surveyData.push({
          key: key,
          info: value,
          images: images
        });
      }
    });
    // console.log(this.surveyData);
    // this.af.database.list('/site_images/images/');
    // this.imageList.remove();
  }
  submitNewImage(imageData: NgForm) {
    // console.log(imageData.form.value)
    // console.log(imageData.value)
    const year = imageData.value['year'];
    this.saveError = '';
    const imageData1 = {
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
    );
  }
  deleteSiteImage(imageToDelete: any) {
    /**
     * Soft delete
     */
    console.log(imageToDelete);
    this.imageList.update(imageToDelete.key, { deleted: true });
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
    this.imageList.update(imageToRestore.key, { deleted: false });
  }

  updateImage(formRef: NgForm, imageToUpdate) {
    this.isYearUpdate = true;
    this.imageToUpdate = imageToUpdate;
    this.fillFormData(formRef, imageToUpdate);
  }

  fillFormData(formRef: NgForm, image) {
    formRef.form.setValue({
      year: (new Date()).getFullYear(),
      location: image.info['location'],
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
    const imageLocation = this.imagePagelocation + '/' + this.imageToUpdate.key + '/images';
    console.log(imageLocation);
    const imageData1 = {
      year: formRef.value['year'],
      image_url: formRef.value['image_url'],
      image_title: formRef.value['image_title'],
      image_subtext: formRef.value['image_subtext'],
      deleted: false
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
  deleteYearImage(key1, key2) {
    const ref = this.imageList.$ref.ref.child(key1).child('images').child(key2);
    this.imageList.update(ref, { deleted: true });
  }
  restoreYearImage(key1, key2) {
    const ref = this.imageList.$ref.ref.child(key1).child('images').child(key2);
    this.imageList.update(ref, { deleted: false });
  }

  setFileURL(fileUrl: string) {
    this.imageUrl = fileUrl;
  }
}
