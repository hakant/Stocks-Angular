import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';

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

  constructor(private stocksService: StocksService, private ngZone: NgZone) { }

  ngOnInit() {
    this.startUpdating();
    // this.stocksService.requestAllStocks().subscribe(
    // data => {
    //   this.stocks = data;
    // });
  }

  ngOnDestroy() {
    this.stopUpdating();
  }

  // startUpdating() {
  //   this.interval = setInterval(() => {
  //     this.stocksService.requestAllStocks().subscribe(
  //       data => {
  //         this.stocks = data;
  //       });
  //   }, 1000);
  // }

  startUpdating() {
      this.ngZone.runOutsideAngular(() => {
        this.interval = setInterval(() => {
          this.ngZone.run(() => {
            this.stocksService.requestAllStocks().subscribe(
              data => {
                this.stocks = data;
              });
          });
      }, 1000);
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

  buy(modal: any) {
    modal.hide();
    this.startUpdating();
  }

  sell(modal: any) {
    modal.hide();
    this.startUpdating();
  }
}
