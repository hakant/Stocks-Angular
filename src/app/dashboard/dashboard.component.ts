import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { StocksService } from '../services/stocks.service';
import { StockInfo } from '../models/stock-info';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  stocks: Array<StockInfo> = null;
  interval: any;
  closeResult: string;
  subscription: Subscription;

  constructor(private stocksService: StocksService, private ngZone: NgZone) { }

  ngOnInit() {
    this.subscription = this.stocksService.stateObservable.subscribe((state) => {
      this.stocks = state.Stocks;
    });
    this.startUpdating();
  }

  ngOnDestroy() {
    this.stopUpdating();
    this.subscription.unsubscribe();
  }

  startUpdating() {
    // @hakant: Technique to fix the timeout issue with Protractor
    // https://christianliebel.com/2016/11/angular-2-protractor-timeout-heres-fix/
      this.ngZone.runOutsideAngular(() => {
        this.interval = setInterval(() => {
          this.ngZone.run(() => {
            this.stocksService.requestAllStocks();
          });
      }, 5000);
    });
  }

  stopUpdating() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  cancel(modal: any) {
    modal.hide();
    this.startUpdating();
  }

  buy(formValues: any, modal: any) {
    this.stocksService
      .buyStock(formValues.numberOfStocks, modal.stock.stockName)
      .subscribe(data => {
        modal.hide();
      },
      err => {
        modal.hide();
        // @hakant: Fix this issue.
        // console.log('Something went wrong!');
      });
    this.startUpdating();
  }

  sell(modal: any) {
    modal.hide();
    this.startUpdating();
  }
}
