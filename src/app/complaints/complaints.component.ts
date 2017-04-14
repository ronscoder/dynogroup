import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { Http } from '@angular/http';
import { MdDialog, MdDialogConfig, MdDialogContent, MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { WaitComponent, ResponseComponent } from '../common/common.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html'
})
export class ComplaintsComponent implements OnInit {
  complaintForm: FormGroup = null;
  constructor(
    private http: Http,
    private _dialog: MdDialog,
    private _snack: MdSnackBar,
    private router: Router
  ) {
    this.complaintForm = new FormGroup({

    })
  }

  ngOnInit() {
  }
  submit(frm: NgForm) {
    if (frm.invalid)
      return;
    console.log(frm.value);
    let values = frm.value;
    let userdata = `
    <table>
      <tr><td>House #</td><td>${values['houseNo']}</td></tr>
      <tr><td>Room #</td><td>${values['roomNo']}</td></tr>
      <tr><td>District</td><td>${values['district']}</td></tr>
      <tr><td>State</td><td>${values['state']}</td></tr>
      <tr><td>Country</td><td>${values['country']}</td></tr>
      <tr><td>Pin Code</td><td>${values['pincode']}</td></tr>
      <tr><td>Phone #</td><td>${values['phone']}</td></tr>
      <tr><td>User email #</td><td>${values['email']}</td></tr>
    </table>
    `;
    let mailOptions = {
      from: `${values['firstName']} ${values['middleName']} ${values['lastName']} <site@dynamicgroupoffoundations.org>`,
      to: "info@dynamicgroupoffoundations.org",
      subject: values['subject'],
      text: `${values['body']}\\n${values}`,
      html: `<p>${values['body']}</p><hr><small>${userdata}</small>`
    };
    console.log(mailOptions);
    // let diagConfig = new MdDialogConfig();
    // let diagContent = new MdDialogContent();
    // let dialogRef = this._dialog.open(WaitComponent)
    const mail_url = 'https://dynogroupservice.herokuapp.com'
    let snackConfig = new MdSnackBarConfig();
    let snackRef = this._snack.open("Please wait. Sending mail...")
    this.http.post(mail_url + '/sendmail', mailOptions).subscribe(
      (response) => {
        console.log(response);
        // dialogRef.close();
        snackRef.dismiss();
        ResponseComponent.satt = "Thank you! We will get to you soon!";
        ResponseComponent.nextAction = "Redirecting to home...";
        let dref = this._dialog.open(ResponseComponent);
        setTimeout(() => {
          dref.close();
          this.router.navigateByUrl("");
        }, 3000);
      },
      (error) => {
        snackRef.dismiss();
      }
    )
  }
  test() {

    ResponseComponent.satt = "Thank you! We will get to you soon!";
    let dref = this._dialog.open(ResponseComponent);
    setTimeout(() => {
      dref.close();
      this.router.navigateByUrl("");
    }, 2000);

  }
}
