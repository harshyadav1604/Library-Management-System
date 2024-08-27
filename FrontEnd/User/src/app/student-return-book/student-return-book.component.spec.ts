import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentReturnBookComponent } from './student-return-book.component';

describe('StudentReturnBookComponent', () => {
  let component: StudentReturnBookComponent;
  let fixture: ComponentFixture<StudentReturnBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentReturnBookComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentReturnBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
