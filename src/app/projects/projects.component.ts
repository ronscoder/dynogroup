import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
declare var google: any;
@Component({
  selector: 'projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  constructor(private http: Http) { }
  noproject: true;
  projects = [];
  ngOnInit() {
    this.http.get('./assets/data/project_table.json').subscribe(
      (data) => {
        this.projects = data.json();
        if (this.projects.length)
          this.loadTable(this.projects);
      }
    )
  }

  loadTable(projectdata) {
    google.charts.load('current', { 'packages': ['table'] });
    google.charts.setOnLoadCallback(() => {
      let dataTable = new google.visualization.DataTable();
      dataTable.addColumn('string', 'Project Name');
      dataTable.addColumn('string', 'Target Groups');
      dataTable.addColumn('string', 'Target Area');
      dataTable.addColumn('string', 'Location');
      dataTable.addColumn('string', 'Implementation Date');
      dataTable.addRows(
        projectdata
      );
      let table = new google.visualization.Table(document.getElementById('project-table'));
      table.draw(dataTable, { showRowNumber: true, width: '100%', height: '100%' })
    });
  }
}


  // <table class="table  table-sm ">
  //   <thead class="thead-default">
  //     <th>#</th>
  //     <th>Project Name</th>
  //     <th>Target Groups</th>
  //     <th>Target Area</th>
  //     <th>Location</th>
  //     <th>Implementation Date</th>
  //   </thead>
  // </table>