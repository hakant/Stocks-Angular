import { Component, OnInit } from '@angular/core';
import { TransactionInfo } from '../models/transaction-info';
import { StocksService } from '../services/stocks.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  transactions: Array<TransactionInfo> = null;

  constructor(private stocksService: StocksService) { }

  ngOnInit() {
    this.stocksService.requestAllTransactions().subscribe(data => {
      this.transactions = data;
    });
  }
}
