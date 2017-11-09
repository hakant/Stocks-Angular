import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

import { DashboardState } from '../models/dashboard-state';
import { StockInfo } from '../models/stock-info';

@Injectable()
export class StocksService {

  private state = new Subject<DashboardState>();
  stateObservable = this.state.asObservable();

  constructor(private http: HttpClient) { }

  public requestAllStocks(): void {
    let url = '/api/stocks.json';
    if (Math.random() > 0.5) {
      url = '/api/stocks2.json';
    }
    this.http.get<AllStocksResponse>(url).map((response) => {
      const stockResponse = response.stocks;
      const stocks: StockInfo[] = [];
      for (const stockName in stockResponse) {
        if (stockResponse.hasOwnProperty(stockName)) {
          stocks.push({
            name: stockName,
            ...stockResponse[stockName]
          });
        }
      }
      this.state.next({
        NetLiquidationValue: response.nlv,
        CashValue: response.cash,
        Stocks: stocks
      });
    }).subscribe();
  }
}

interface AllStocksResponse {
  nlv: number;
  cash: number;
  stocks: {
    [name: string]: {
      lastPrice: number;
      change: number;
      percentageChange: number;
    }
  };
}



