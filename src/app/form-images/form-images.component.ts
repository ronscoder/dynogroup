import { Component, OnInit, Input, OnChanges, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms'
import { DataServiceService } from '../data-service.service';

import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { storage } from 'firebase';
import { Observable } from 'rxjs/Rx';
import { GalleryGroups } from '../helper';

@Component({
  selector: 'app-form-images',
  templateUrl: './form-images.component.html',
  styleUrls: ['./form-images.component.css']
})
export class FormImagesComponent implements OnInit {
  imageList: FirebaseListObservable<any[]>;
  // imageRef: FirebaseListObservable<any[]>;
  // ** This form handles only gallery and carousal 
  galleryGroups = GalleryGroups.filter((val) => { return val.type !== 's'; });
  group = this.galleryGroups[0].code;
  // image: FirebaseListObservable<any>;
  selectedFile;
  filename;
  downloadFilePath;
  uploadingImage = false;
  imageFileRef;
  newImageForm: NgForm;

  constructor(
    private db: DataServiceService
  ) { }

  ngOnInit() {
    this.imageList = this.db.getSiteImages(this.group);
  }
  groupChanged(form: NgForm) {
    console.log('group changed');
    form.resetForm();
    this.imageList = this.db.getSiteImages(this.group);
  }
  submitNewImage(imageData: NgForm) {
    console.log(imageData.form.value);
    console.log(imageData.value);
    const imageDataCopy = imageData.value;
    imageDataCopy['deleted'] = false;
    this.db.addSiteImage(this.group, imageDataCopy).then(
      resolved => {
        console.log('Image submitted');
      }
    );
  }
  deleteSiteImage(imageToDelete: any) {
    /**
     * Soft delete
     */
    // console.log(imageToDelete);
    // this.db.deleteSiteImage(this.imageList, imageToDelete);
    // this.imageList.remove(imageToDelete);
    this.imageList.update(imageToDelete.$key, { deleted: true });
  }
  copyImage(formRef: NgForm, imageToCopy) {
    formRef.form.setValue({
      image_url: imageToCopy['image_url'],
      image_title: imageToCopy['image_title'],
      image_subtext: imageToCopy['image_subtext'],
    });
  }

  restore(imageToRestore: any) {
    this.imageList.update(imageToRestore.$key, { deleted: false });
  }


  onFileChange(fileEvent) {
    this.selectedFile = fileEvent.target.files[0];
    this.filename = this.selectedFile.name;
  }

  uploadFile() {
    const storageRef = storage().ref();
    const imagesRef = storageRef.child('site_images');
    this.imageFileRef = imagesRef.child(this.filename);
    const fullPath = this.imageFileRef.fullPath;
    this.uploadingImage = true;
    const uploadTask = this.imageFileRef.put(this.selectedFile);

    uploadTask.on('state_changed', snapshot => {
      console.log('uploading file...');
    }, Error => {
      console.log(Error);
    }, () => {
      this.uploadingImage = false;
      this.downloadFilePath = uploadTask.snapshot.downloadURL;
    });
  }
}
