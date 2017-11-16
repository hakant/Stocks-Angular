import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

import { DashboardState } from '../models/dashboard-state';
import { StockInfo } from '../models/stock-info';
import { TransactionInfo } from '../models/transaction-info';

import { environment } from '../../environments/environment';

@Injectable()
export class StocksService {

  private state = new Subject<DashboardState>();
  stateObservable = this.state.asObservable();

  constructor(private http: HttpClient) { }

  public loadStocks(numberOfStocks: number): Observable<any> {
    const url = environment.apiUrl + 'start';
    return this.http.post(url, { numberOfStocks: numberOfStocks });
  }

  public requestAllStocks(): void {
    const url = environment.apiUrl + 'stocks';
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
    const url = environment.apiUrl + 'stocks';
    return this.http.post(url, { StockName: stockName, Units: numberOfStocks });
  }

  public requestAllTransactions(): Observable<TransactionInfo[]> {
    const url = environment.apiUrl + 'transactions';
    return this.http.get<AllTransactionsResponse>(url).map((response) => {
      const transactionsResponse = response.transactions;
      const transactions: TransactionInfo[] = [];
      for (const transactionId in transactionsResponse) {
        if (transactionsResponse.hasOwnProperty(transactionId)) {
          transactions.push({
            id: transactionId,
            ...transactionsResponse[transactionId]
          });
        }
      }
      return transactions;
    });
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

interface AllTransactionsResponse {
  transactions: {
    [id: string]: {
      date: Date;
      price: number;
      units: number;
    }
  };
}



