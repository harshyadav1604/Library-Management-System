import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrarianSettingsComponent } from './librarian-settings.component';

describe('LibrarianSettingsComponent', () => {
  let component: LibrarianSettingsComponent;
  let fixture: ComponentFixture<LibrarianSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LibrarianSettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibrarianSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
