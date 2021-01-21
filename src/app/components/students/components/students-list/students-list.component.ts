import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '@src/app/core/models/student';
import { StudentService } from '@src/app/core/services/students/student.service';
import { RouterExtensions } from '@nativescript/angular';
import { Dialogs, ItemEventData, SwipeGestureEventData } from '@nativescript/core';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent implements OnInit {

  Students$: Observable<Student[]>;
  selectedItem: Student;
  isBusy: Boolean = true;
  studentsData: any;

  constructor(
    private studentService: StudentService,
    private routerExtensions: RouterExtensions
  ) { }

  ngOnInit(): void {
    this.loadStudentsList();
  }

  goBack() {
    this.routerExtensions.navigate(['/home'], {
      transition: {
        name: 'fade'
      }
    });
  }

  onNavItemTap(NavItemTap: String) {
    this.routerExtensions.navigate([NavItemTap], {
      transition: {
        name: 'fade'
      }
    });
  }

  // #region AbrirDetalles
  onItemTap(evt: ItemEventData): void {
    const index = evt.index;
    this.Students$.subscribe(
      data => {
        this.selectedItem = data[0][index];
        /* console.log(this.selectedItem['matricule']); */
        this.openDetails(this.selectedItem);
      },
      error => {
        console.error(error);
      }
    );
  }

  openDetails(itemUser: Student): void {
    const matricule = itemUser['matricule'];
    this.routerExtensions.navigate(['/students/details', matricule], {
      transition: {
        name: 'fade'
      }
    });
  }
  // #endregion

  onSwipe(args: SwipeGestureEventData) {
    const direction = args.direction;
    if (direction === 8) {
      this.isBusy = true;
      this.loadStudentsList();
    }
  }

  loadStudentsList() {
    this.Students$ = this.studentService.getStudents();
    this.Students$.subscribe(
      data => {
        this.studentsData = data[0];
      },
      error => { },
      () => {
        this.isBusy = false;
      });
  }

  onTouch() {
    this.routerExtensions.navigate(['/students/new'],
      {
        transition: {
          name: 'fade'
        }
      });
  }
}
