import { Component, OnInit, OnChanges } from '@angular/core';
import { NgModel, ControlValueAccessor } from '@angular/forms'
import { DataServiceService } from '../../data-service.service';
import { Observable, Subject } from 'rxjs/Rx';


@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent {
  summaries_fy = [];
  selectedFYIdx = 0;
  constructor(
    private db: DataServiceService
  ) { }

  ngOnInit() {
    // console.log(this.selectedFY)
    this.db.getFiDocs().subscribe(
      (docs) => {
        this.summaries_fy = docs;
        this.selectedFYIdx = 0;
      }
    )


  }

}
