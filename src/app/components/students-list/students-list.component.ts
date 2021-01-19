import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '@src/app/interfaces/student';
import { StudentService } from '@src/app/services/students/student.service';
import { RouterExtensions } from '@nativescript/angular';
import { Dialogs, ItemEventData, SwipeGestureEventData } from '@nativescript/core';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent implements OnInit, OnDestroy {

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

  ngOnDestroy(): void {
    this.Students$.subscribe().unsubscribe();
  }

  goBack() {
    this.routerExtensions.backToPreviousPage();
  }

  onNavItemTap(NavItemTap: String) {
    this.routerExtensions.navigate([NavItemTap], {
      transition: {
        name: 'fade'
      }
    });
  }

  onEditTap(ItemStudent: Student) {
    this.routerExtensions.navigate(['/edit', JSON.stringify(ItemStudent)], {
      transition: {
        name: 'fade'
      }
    });
  }

  onDeleteTap(ItemStudent: Student) {
    const matricule: string = ItemStudent.matricule;
    const confirmOptions = {
      title: 'Eliminar estudiante', message: `¿Seguro que desea eliminar a "${ItemStudent.name} ${ItemStudent.lastname}"?`,
      okButtonText: 'Sí', cancelButtonText: 'No'
    };
    const alertOptions = { title: 'Eliminado', message: '', okButtonText: 'Aceptar' };
    Dialogs.confirm(confirmOptions)
      .then(result => {
        if (result) {
          this.studentService.deleteStudent(matricule)
            .subscribe(
              (response: any) => {
                if (response.error) {
                  alertOptions.message = 'A ocurrido un error al eliminar el registro.';
                  Dialogs.alert(alertOptions);
                } else {
                  this.isBusy = true;
                  setTimeout(() => {
                    this.isBusy = false;
                  }, 1000);
                }
              });
        }
      }).catch(error => {
        console.log(error);
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
    this.routerExtensions.navigate(['/details', matricule], {
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
      setTimeout(() => {
        this.isBusy = false;
      }, 1500);
    }
  }

  loadStudentsList() {
    try {
      this.Students$ = this.studentService.getStudents();
      this.Students$.subscribe(data => {
        this.studentsData = data[0];
      },
        error => { },
        () => {
          this.isBusy = false;
        });
    } catch (error) {
      console.log(error);
    }
  }

  onTouch() {
    this.routerExtensions.navigate(['/new'],
      {
        transition: {
          name: 'fade'
        }
      });
  }
}
