import { TestBed } from '@angular/core/testing';

import { AnalystGuard } from './analyst.guard';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthRoutingModule } from '../auth/auth-routing.module';

describe('AnalystGuard', () => {
  let guard: AnalystGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule,
        AuthRoutingModule]

    });
    guard = TestBed.inject(AnalystGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
