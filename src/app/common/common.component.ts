import { Component, OnInit, Input } from '@angular/core';


@Component({
  template: `
      <md-spinner></md-spinner>
      {{ostatus}}{{text}}
  `
})
export class WaitComponent {
  public static satt: string = "Please wait...";
  @Input() text: string;
  public ostatus: string;
  constructor(){
    this.ostatus = WaitComponent.satt;
  }
}

@Component({
  template: `
      <h3>{{ostatus}}{{text}}</h3>
      <p>{{nextAction}}
  `
})
export class ResponseComponent {
  public static satt: string = "Thank you!";
  public static nextAction: string = "Redirecting to home...";
  @Input() text: string;
  public ostatus: string;
  public nextAction: string;
  constructor(){
    this.ostatus = ResponseComponent.satt;
    this.nextAction = ResponseComponent.nextAction;
  }
}



