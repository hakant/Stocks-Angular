import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

import { IntroductionComponent } from './introduction.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ModalComponent, StockTransactionInfo } from '../shared/modal.component';
import { appRoutes } from '../routes';

describe('IntroductionComponent', () => {
  let component: IntroductionComponent;
  let fixture: ComponentFixture<IntroductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        IntroductionComponent,
        DashboardComponent,
        ModalComponent
      ],
      imports: [
        FormsModule,
        RouterModule.forRoot(appRoutes)
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
