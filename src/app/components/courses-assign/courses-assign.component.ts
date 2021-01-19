import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';

@Component({
  selector: 'app-courses-assign',
  templateUrl: './courses-assign.component.html',
  styleUrls: ['./courses-assign.component.scss']
})
export class CoursesAssignComponent implements OnInit {

  constructor(
    private routerExtensions: RouterExtensions
  ) { }

  ngOnInit(): void {
  }

  goBack() {
    this.routerExtensions.backToPreviousPage();
  }

}
