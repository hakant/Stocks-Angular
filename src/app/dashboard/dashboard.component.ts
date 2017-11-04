import { Component, OnInit, OnDestroy } from '@angular/core';

import { StocksService } from '../services/stocks.service';
import { StockInfo } from '../models/stock-info';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  stocks: Array<StockInfo>;
  interval: any;

  constructor(private stocksService: StocksService) { }

  ngOnInit() {

    this.stocksService.requestAllStocks().subscribe(
      data => {
        this.stocks = data;
      });
    // this.interval = setInterval(() => {
    //   this.stocksService.requestAllStocks().subscribe(
    //     data => {
    //       this.stocks = data;
    //     });
    // }, 5000);
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}

