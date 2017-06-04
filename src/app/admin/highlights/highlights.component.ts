import { Component, OnInit } from '@angular/core';
import { GalleryGroups } from '../../helper';
import { AngularFire, FirebaseListObservable, FirebaseRef } from 'angularfire2';

@Component({
  selector: 'app-highlights',
  templateUrl: './highlights.component.html',
  styleUrls: ['./highlights.component.css']
})
export class HighlightsComponent implements OnInit {
  highlights: FirebaseListObservable<any[]>;
  // [
  //   { comp: 'survey', group: '', limit: 1 },
  //   { comp: 'gallery', group: 'pd', limit: 1 },
  // ];

  //
  constructor(
    private af: AngularFire
  ) {
  }
  ngOnInit() {
    // ** carousal is not a part of highlights */
    // this.highlights = GalleryGroups.filter(val => { return val.type !== 'c'; });
    this.highlights = this.af.database.list('/gallerymeta');
  }

  change(h) {
    h.highlight = !h.highlight;
    this.highlights.update(h, { highlight: h.highlight });
  }
  updateLimit(h) {
    console.log(h.limit);
    this.highlights.update(h, { limit: h.limit });
  }
}
