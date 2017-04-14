import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms'
import { DataServiceService } from '../data-service.service';

import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from "rxjs"

@Component({
  selector: 'app-form-images',
  templateUrl: './form-images.component.html',
  styleUrls: ['./form-images.component.css']
})
export class FormImagesComponent implements OnInit {
  @Input() imagePagelocation;
  imageList: FirebaseListObservable<any[]>;
  constructor(
    private db: DataServiceService
  ) { }

  ngOnInit() {
    this.imageList = this.db.getSiteImages(this.imagePagelocation)
  }
  submitNewImage(imageData: NgForm) {
    // console.log(imageData.form.value)
    // console.log(imageData.value)
    this.db.addSiteImage(this.imagePagelocation, imageData.value).then(
      resolved => {
        console.log(resolved);
      }
    )
  }
  deleteSiteImage(imageToDelete) {
    // console.log(imageToDelete);
    // this.db.deleteSiteImage(this.imageList, imageToDelete);
    this.imageList.remove(imageToDelete);
  }
  copyImage(formRef: NgForm, imageToCopy) {
    formRef.form.setValue({
      image_url: imageToCopy['image_url'],
      image_title: imageToCopy['image_title'],
      image_subtext: imageToCopy['image_subtext'],
    })
  }
}
