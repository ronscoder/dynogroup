import { Component, OnInit, Optional, HostListener, ElementRef } from '@angular/core';
import { MdDialog, MdSnackBar, MdDialogConfig, DialogPosition, MdDialogClose, MdDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../data-service.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  // styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  private mdconfig = new MdDialogConfig();
  constructor(
    public mddiag: MdDialog,
    private mdsnack: MdSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private el: ElementRef,
    private data: DataServiceService,
  ) {
    this.mdconfig.height = '90%';
    this.mdconfig.width = '80%';
  }

  // @HostListener('mouseenter') onmouseenter() {
  //   this.el.nativeElement.style.fontSize = '3em';
  // }

  ngOnInit() {

  }

  disclaimer() {

    // mdconfig.disableClose = false;
    // mdconfig.position = {left: '10em'};

    this.mddiag.open(DisclaimerComponent, this.mdconfig);
    // ** Prevent link propagation

  }
  privacy() {
    this.mddiag.open(PrivacyComponent, this.mdconfig);
  }
  terms() {
    this.mddiag.open(TermsComponent, this.mdconfig);
  }
}

@Component({
  templateUrl: './disclaimer.html'
})
export class DisclaimerComponent {
  constructor(
    @Optional() public dialogRef: MdDialogRef<DisclaimerComponent>
  ) {
  }
}


@Component({
  templateUrl: './privacy.html'
})
export class PrivacyComponent {
  constructor(
    @Optional() public dialogRef: MdDialogRef<PrivacyComponent>
  ) {
  }
}

@Component({
  templateUrl: './t&c.html'
})
export class TermsComponent {
  constructor(
    @Optional() public dialogRef: MdDialogRef<TermsComponent>
  ) {
  }
}