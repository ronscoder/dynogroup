import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import 'hammerjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { DatepickerModule } from 'ng2-bootstrap/datepicker';
import { CarouselModule } from 'ng2-bootstrap';
import { Ng2PageScrollModule } from 'ng2-page-scroll';

import { AdminComponent } from './admin/admin.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './routing.module';
import { HomeComponent } from './home/home.component';
import { TabsModule } from 'ng2-bootstrap';
import { AlertModule } from 'ng2-bootstrap';
import { DataServiceService } from './data-service.service';
import { ContactusComponent } from './contactus/contactus.component';
import {
  FooterComponent, DisclaimerComponent,
  PrivacyComponent,
  TermsComponent
} from './footer/footer.component';
import {
  OrgansationStructureComponent, AdminLegalDetailsComponent
  , OrganProfile
} from './organsation-structure/organsation.component';
import { ComplaintsComponent } from './complaints/complaints.component';
import { WaitComponent, ResponseComponent } from './common/common.component';

import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { initializeApp } from 'firebase';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectComponent } from './projects/project/project.component';
import { VerticalsComponent } from './verticals/verticals.component';
import { ProjectsInfoComponent } from './projects/projects-info/projects-info.component';
import { BankersAuditorsComponent } from './organsation-structure/bankers-auditors/bankers-auditors.component';
import { GalleryComponent } from './gallery/gallery.component';
import { FormHomepageComponent } from './admin/form-homepage/form-homepage.component';
// import { FormGalleryComponent } from './admin/form-gallery/form-gallery.component';
// import { FormCarousalComponent } from './admin/form-carousal/form-carousal.component';
import { AnnualReportsComponent } from './annual-reports/annual-reports.component';
import { SummaryComponent } from './finance/summary/summary.component';
import { FormImagesComponent } from './form-images/form-images.component';
import { HighlightDirective } from './highlight.directive';
import { LoginComponent } from './admin/login/login.component';
import { LoaderComponent } from './common/loader/loader.component';

export const afconfig = {
  apiKey: 'AIzaSyAwZd41BpkvinnJePapf-8KsGNcHsS9hDU',
  authDomain: 'site-a0bf0.firebaseapp.com',
  databaseURL: 'https://site-a0bf0.firebaseio.com',
  projectId: 'site-a0bf0',
  storageBucket: 'site-a0bf0.appspot.com',
  messagingSenderId: '809395012660'
};
export const authConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}
@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    HomeComponent,
    ContactusComponent,
    FooterComponent,
    DisclaimerComponent,
    WaitComponent,
    ResponseComponent,
    PrivacyComponent,
    TermsComponent,
    OrgansationStructureComponent,
    AdminLegalDetailsComponent,
    OrganProfile,
    ComplaintsComponent,
    ProjectsComponent,
    ProjectComponent,
    VerticalsComponent,
    ProjectsInfoComponent,
    BankersAuditorsComponent,
    GalleryComponent,
    FormHomepageComponent,
    // FormGalleryComponent,
    // FormCarousalComponent,
    AnnualReportsComponent,
    SummaryComponent,
    FormImagesComponent,
    HighlightDirective,
    LoginComponent,
    LoaderComponent,
  ],
  entryComponents: [DisclaimerComponent, WaitComponent, PrivacyComponent, TermsComponent, ResponseComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    NgbModule.forRoot(),
    DatepickerModule.forRoot(),
    CarouselModule.forRoot(),
    Ng2PageScrollModule.forRoot(),
    TabsModule.forRoot(),
    AlertModule.forRoot(),
    AppRoutingModule,
    // initializeApp(afconfig),
    AngularFireModule.initializeApp(afconfig)
  ],
  providers: [DataServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
