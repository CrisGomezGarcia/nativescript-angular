import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesAddStudentsComponent } from '@src/app/components/courses/components/courses-add-students/courses-add-students.component';

describe('CoursesAddStudentsComponent', () => {
  let component: CoursesAddStudentsComponent;
  let fixture: ComponentFixture<CoursesAddStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursesAddStudentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesAddStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
