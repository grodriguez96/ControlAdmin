import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusServerDialog } from './status-server-dialog.component';

describe('StatusServerDialog', () => {
  let component: StatusServerDialog;
  let fixture: ComponentFixture<StatusServerDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StatusServerDialog]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusServerDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
