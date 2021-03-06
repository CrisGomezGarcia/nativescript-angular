import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from '@nativescript/angular';
import { Dialogs, Page } from '@nativescript/core';
import { Student } from '@src/app/core/models/student';
import { StudentService } from '@src/app/core/services/students/student.service';
import { environment } from '@src/environments/environment';

@Component({
  selector: 'app-students-details',
  templateUrl: './students-details.component.html',
  styleUrls: ['./students-details.component.scss']
})
export class StudentsDetailsComponent implements OnInit {
  matricule: String;
  student: Student;
  connectionActive: Boolean;

  constructor(
    private routerExtensions: RouterExtensions,
    private activatedRoute: ActivatedRoute,
    private studentService: StudentService,
    private page: Page
  ) {
    this.verifyConnectionOnInternet();
    this.activatedRoute.params.subscribe(
      params => {
        this.matricule = params['matricule'];
      });
  }

  ngOnInit(): void {
    this.studentService.getStudent(this.matricule)
      .subscribe(data => {
        this.student = data[0][0];
      });
  }

  goBack() {
    this.routerExtensions.backToPreviousPage();
  }

  onDeleteTap() {
    if (this.verifyConnectionOnInternet()) {
      const confirmOptions = {
        title: 'Eliminar estudiante', message: `¿Seguro que desea eliminar a "${this.student.name} ${this.student.lastname}"?`,
        okButtonText: 'Sí', cancelButtonText: 'No'
      };
      const alertOptions = { title: 'Eliminado', message: '', okButtonText: 'Aceptar' };
      Dialogs.confirm(confirmOptions)
        .then(result => {
          if (result) {
            this.studentService.deleteStudent(this.student.matricule)
              .subscribe(
                (response: any) => {
                  if (response.error) {
                    alertOptions.message = 'A ocurrido un error al eliminar el registro.';
                    Dialogs.alert(alertOptions);
                  } else { }
                },
                error => {
                  console.log(error);
                },
                () => {
                  this.routerExtensions.navigate(['/students'], {
                    transition: {
                      name: 'fade'
                    },
                    clearHistory: true
                  });
                });
          }
        }).catch(error => {
          console.log(error);
        });
    }
  }

  onEditTap() {
    this.routerExtensions.navigate(['/students/edit', JSON.stringify(this.student)], {
      transition: {
        name: 'fade'
      }
    });
  }

  verifyConnectionOnInternet(): Boolean {
    this.connectionActive = environment.connectionActive;
    return this.connectionActive;
  }

  tryConnection(statusConnection: any) {
    this.connectionActive = statusConnection;
    if (this.connectionActive) {
      this.page.actionBarHidden = false;
    }
  }

}
