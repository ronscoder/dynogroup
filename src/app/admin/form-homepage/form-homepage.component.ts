import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Http } from '@angular/http';
import { DataServiceService } from '../../data-service.service';

@Component({
  selector: 'app-form-homepage',
  templateUrl: './form-homepage.component.html',
  styleUrls: ['./form-homepage.component.css']
})
export class FormHomepageComponent implements OnInit {
  addContact: FormGroup;
  public contacts = [];
  constructor(
    private http: Http,
    private data: DataServiceService
  ) {
    this.addContact = new FormGroup(
      {
        number: new FormControl('', Validators.required)
      }
    )
  }
  ngOnInit() {
    this.data.getContacts().subscribe(
      (res) => {
        this.contacts = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  submitContact() {
    let newContact = {
      number: this.addContact.value['number']
    }
    this.contacts.push(newContact);
  }

  deleteContact(id: number, index: number) {
    // this.http.delete(this.server + '/contacts/' + id).subscribe(
    //   (response) => {
    //     // this.alerts = [];
    //     // this.alerts.push({type:'success', msg: 'Contact deleted'})
    this.contacts.splice(index, 1);
    //   },
    //   (error) => {

    //   }
    // )
  }
}


  // this.http.post(this.server + '/contacts', newContact).subscribe(
  //   (response) => {
  //     console.log(response);
  //     this.alerts = [];
  //     this.alerts.push({ type: 'success', msg: response.text() });
  //   },
  //   (error) => {
  //     console.log(error);
  //     this.alerts = [];
  //     this.alerts.push({ type: 'danger', msg: error.text() })
  //   }
  // )