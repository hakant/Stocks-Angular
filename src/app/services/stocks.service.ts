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

  public loadStocks(numberOfStocks: number): Observable<any> {
    const url = 'http://localhost:5000/api/start';
    return this.http.post(url, { numberOfStocks: numberOfStocks });
  }

  public requestAllStocks(): void {
    const url = 'http://localhost:5000/api/stocks';
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
        NetLiquidationValue: response.netLiquidationValue,
        CashValue: response.cash,
        Stocks: stocks
      });
    }).subscribe();
  }

  public buyStock(numberOfStocks: number, stockName: string): Observable<any> {
    const url = 'http://localhost:5000/api/stocks';
    return this.http.post(url, { StockName: stockName, Units: numberOfStocks });
  }
}

interface AllStocksResponse {
  netLiquidationValue: number;
  cash: number;
  stocks: {
    [name: string]: {
      lastPrice: number;
      change: number;
      percentageChange: number;
    }
  };
}



