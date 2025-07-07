import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAnalystComponent } from './add-analyst.component';

describe('AddAnalystComponent', () => {
  let component: AddAnalystComponent;
  let fixture: ComponentFixture<AddAnalystComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAnalystComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAnalystComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
