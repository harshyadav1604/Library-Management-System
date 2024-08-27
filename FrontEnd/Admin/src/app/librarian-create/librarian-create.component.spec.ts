import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrarianCreateComponent } from './librarian-create.component';

describe('LibrarianCreateComponent', () => {
  let component: LibrarianCreateComponent;
  let fixture: ComponentFixture<LibrarianCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LibrarianCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibrarianCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
