import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesAssignComponent } from '@src/app/components/courses-assign/courses-assign.component';

describe('CoursesAssignComponent', () => {
  let component: CoursesAssignComponent;
  let fixture: ComponentFixture<CoursesAssignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursesAssignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
