import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '@src/app/core/models/student';
import { StudentService } from '@src/app/core/services/students/student.service';
import { RouterExtensions } from '@nativescript/angular';
import { Dialogs, ItemEventData, Page, SwipeGestureEventData } from '@nativescript/core';
import { environment } from '@src/environments/environment';

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
  // connectionType: String;
  connectionActive: Boolean;

  constructor(
    private studentService: StudentService,
    private routerExtensions: RouterExtensions,
    private page: Page
  ) {
    if (this.verifyConnectionOnInternet()) {
      this.loadStudentsList();
    } else {
      this.isBusy = false;
    }
  }

  ngOnInit(): void { }

  onTry() {
    if (this.verifyConnectionOnInternet()) {
      this.isBusy = true;
      this.loadStudentsList();
    } else {
      Dialogs.alert('Verifique su conexión a internet');
    }
  }

  goBack(): void {
    this.routerExtensions.navigate(['/home'], {
      transition: {
        name: 'fade'
      }
    });
  }

  // #region AbrirDetalles
  onItemTap(evt: ItemEventData): void {
    if (this.verifyConnectionOnInternet()) {
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
  }

  openDetails(itemUser: Student): void {
    if (this.verifyConnectionOnInternet()) {
      const matricule = itemUser['matricule'];
      this.routerExtensions.navigate(['/students/details', matricule], {
        transition: {
          name: 'fade'
        }
      });
    }
  }
  // #endregion

  onSwipe(args: SwipeGestureEventData): void {
    const direction = args.direction;
    if (this.verifyConnectionOnInternet()) {
      if (direction === 8) {
        this.isBusy = true;
        this.loadStudentsList();
      }
    }
  }

  loadStudentsList(): void {
    this.Students$ = this.studentService.getStudents();
    this.Students$.subscribe(
      data => {
        this.studentsData = data[0];
      },
      error => {
        console.log(error);
      },
      () => {
        setTimeout(() => {
          this.isBusy = false;
        }, 500);
      });
  }

  onTouch(): void {
    if (this.verifyConnectionOnInternet()) {
      this.routerExtensions.navigate(['/students/new'],
        {
          transition: {
            name: 'fade'
          }
        });
    }
  }

  verifyConnectionOnInternet(): Boolean {
    this.connectionActive = environment.connectionActive;
    return this.connectionActive;
  }

  tryConnection(statusConnection: any) {
    this.connectionActive = statusConnection;
    if (this.connectionActive) {
      this.page.actionBarHidden = false;
      this.isBusy = true;
      this.loadStudentsList();
    }
  }

}
