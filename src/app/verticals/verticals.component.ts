import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-verticals',
  templateUrl: './verticals.component.html',
  styleUrls: ['./verticals.component.css']
})
export class VerticalsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  scrollTo(id) {
    window.location.hash = id;
  }
}
