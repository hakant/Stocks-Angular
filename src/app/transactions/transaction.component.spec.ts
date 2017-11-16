import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { TransactionComponent } from './transaction.component';
import { Observable } from 'rxjs/Observable';
import { TransactionInfo } from '../models/transaction-info';
import { StocksService } from '../services/stocks.service';

class MockStockService {
  requestAllTransactions(): Observable<TransactionInfo[]> {
    return Observable.of([]);
  }
}

describe('TransactionComponent', () => {
  let component: TransactionComponent;
  let fixture: ComponentFixture<TransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TransactionComponent
      ],
      imports: [
        HttpClientModule
      ],
      providers: [
        {
          provide: StocksService,
          useClass: MockStockService
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
