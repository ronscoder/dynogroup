import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import { NgForm, Form } from '@angular/forms';
import { database } from 'firebase';

declare var google: any;
@Component({
  selector: 'project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  @Input() pid: any;
  tabledata = [];
  tasks = [
    {
      task_id: 'initiation', task_name: 'initiation'
      // },
      // {
      //   task_id: '2', task_name: 'A2'
    }
  ];
  constructor(private http: Http) { }

  ngOnInit() {
    this.loadProjectOverview();
  }

  addTask(formdata: NgForm) {
    // console.log(formdata);
    database().ref('/projects/' + this.pid + '/tasks').push(formdata.value).then(
      resolved => {
        formdata.resetForm();
      }
    )
  }
  loadProjectOverview() {
    database().ref('/projects/' + this.pid + '/tasks').on('value', (snap) => {
      // console.log(snap.val());
      let tasks = snap.val();

      for (let key in tasks) {
        this.tasks.push(tasks[key]);
        // console.log(tasks[key].dependencies);
        this.tabledata.push(
          [
            tasks[key].task_id,
            tasks[key].task_name,
            new Date(tasks[key].start_date),
            new Date(tasks[key].end_date),
            null,
            tasks[key].percent_complete == ""? 0: tasks[key].percent_complete,
            tasks[key].dependencies != ""? tasks[key].dependencies.join(',') : null
          ]);
      }
      // console.log(this.tabledata);
      if (this.tabledata.length > 0)
        this.loadProjectTable(this.tabledata);
    })
  }
  daysToMilliseconds(days) {
    return days * 24 * 60 * 60 * 1000;
  }
  loadProjectTable(projectdata) {
    google.charts.load('current', { 'packages': ['gantt'] });
    google.charts.setOnLoadCallback(() => {
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Task ID');
      data.addColumn('string', 'Task Name');
      data.addColumn('date', 'Start Date');
      data.addColumn('date', 'End Date');
      data.addColumn('number', 'Duration');
      data.addColumn('number', 'Percent Complete');
      data.addColumn('string', 'Dependencies');
      data.addRows(
        projectdata
      );
      var options = {
        height: 275
      };

      var chart = new google.visualization.Gantt(document.getElementById('project_overview'));

      chart.draw(data, options);
    });
  }
}
