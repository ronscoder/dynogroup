import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { ContactusComponent } from './contactus/contactus.component';
import {
  OrgansationStructureComponent, AdminLegalDetailsComponent,
  OrganProfile
} from './organsation-structure/organsation.component';
import { ComplaintsComponent } from './complaints/complaints.component';
import { VerticalsComponent } from './verticals/verticals.component';
import { ProjectsInfoComponent } from './projects/projects-info/projects-info.component';
import { BankersAuditorsComponent } from './organsation-structure/bankers-auditors/bankers-auditors.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ImageByYearComponent } from './gallery/image-by-year/image-by-year.component';
import { AnnualReportsComponent } from './annual-reports/annual-reports.component';
import { SummaryComponent } from './finance/summary/summary.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent // pathMatch: 'full',// redirectTo: '/materials',
  },
  { path: 'dev', component: HomeComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'contactus', component: ContactusComponent },
  { path: 'organisation_structure', component: OrgansationStructureComponent },
  { path: 'adminlegal_details', component: AdminLegalDetailsComponent },
  { path: 'organisation_profile', component: OrganProfile },
  { path: 'complaints_suggestions', component: ComplaintsComponent },
  { path: 'verticals', component: VerticalsComponent },
  { path: 'projects-info', component: ProjectsInfoComponent },
  { path: 'bankers-auditors', component: BankersAuditorsComponent },
  { path: 'gallery/:group', component: GalleryComponent },
  { path: 'annual-reports', component: AnnualReportsComponent },
  { path: 'fi-summary', component: SummaryComponent },
  { path: 'gallery-survey', component: ImageByYearComponent },
  // { path: '', pathMatch: 'full', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
