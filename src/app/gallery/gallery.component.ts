import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../data-service.service';
import { FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  figures: FirebaseListObservable<any[]>;
  constructor(
    private db: DataServiceService
  ) { }

  ngOnInit() {
    this.figures = this.db.getSiteImages("gallery");
    // this.db.getGallery().subscribe(
    //   (res) => {
    //     this.figures = res;
    //   }
    // )
    // this.figures = [
    //   { src: "assets/images/gallery/Awang-Kongpal-Govt-High-School-2.jpg", _caption: "<h4>Hundreds of schools in such condition</h4><p><em>Most of these is oblivion to many in charge</em></p>" },
    //   { src: "assets/images/gallery/A-drain-at-Lamlong.jpg", _caption: "<h4>Hundreds of schools in such condition</h4><p><em>Most of these is oblivion to many in charge</em></p>" },
    //   { src: "assets/images/gallery/Lamlong-market.jpg", _caption: "<h4>Hundreds of schools in such condition</h4><p><em>Most of these is oblivion to many in charge</em></p>" },
    //   { src: "assets/images/gallery/Khurai Girls High School.jpg.jpg", _caption: "<h4>Hundreds of schools in such condition</h4><p><em>Most of these is oblivion to many in charge</em></p>" }
    // ]
  }

}
