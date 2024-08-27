import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrarianUserComponent } from './librarian-user.component';

describe('LibrarianUserComponent', () => {
  let component: LibrarianUserComponent;
  let fixture: ComponentFixture<LibrarianUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LibrarianUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibrarianUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
