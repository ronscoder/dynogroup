import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { storage } from 'firebase';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {
  @Output() result = new EventEmitter<string>();
  selectedFile;
  filename;
  downloadFilePath;
  uploadingImage = false;
  imageFileRef;

  constructor() { }

  ngOnInit() {
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
      console.log(this.downloadFilePath);
      this.result.emit(this.downloadFilePath);
    });
  }
}
