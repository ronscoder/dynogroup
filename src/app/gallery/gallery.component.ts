import { Component, OnInit, Input } from '@angular/core';
import { DataServiceService } from '../data-service.service';
import { FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';
import { GalleryGroups } from '../helper';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  // @Input() group: string;
  figures = [];
  loading = false;
  modalFigure;
  groupName: string;

  constructor(
    private db: DataServiceService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.loading = true;
    this.route.params.subscribe(params => {
      // console.log(params['group']);
      const group = params['group'];
      this.groupName = GalleryGroups.find((val) => {
        return val.code === group;
      }).desc;
      this.db.getSiteImages(group)
        .map(vals =>
          vals.filter((val) => val.deleted !== true)).subscribe(values => {
            console.log(values);
            this.figures = values;
            this.loading = false;
          }, error => {
            console.error(error);
          });
    });
  }
}
