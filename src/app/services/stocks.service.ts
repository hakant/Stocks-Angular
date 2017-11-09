import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { StockInfo } from '../models/stock-info';

@Injectable()
export class StocksService {

  constructor(private http: HttpClient) { }

  public requestAllStocks(): Observable<Array<StockInfo>> {
    let url = '/api/stocks.json';
    if (Math.random() > 0.5) {
      url = '/api/stocks2.json';
    }
    return this.http.get<AllStocksResponse>(url).map((response) => {
      const stocks: StockInfo[] = [];
      const stockResponse = response.stocks;
      for (const stockName in stockResponse) {
        if (stockResponse.hasOwnProperty(stockName)) {
          stocks.push({
            name: stockName,
            ...stockResponse[stockName]
          });
        }
      }
      return stocks;
    });
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



