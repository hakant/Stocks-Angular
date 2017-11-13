import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StocksService } from '../services/stocks.service';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.css']
})
export class IntroductionComponent implements OnInit {

  constructor(private router: Router, private stocksService: StocksService) { }

  ngOnInit() {
  }

  start(formValues) {
    // console.log(formValues.numberOfStocks);
    this.stocksService.loadStocks(formValues.numberOfStocks).subscribe(
      data => {
        this.router.navigate(['dashboard']);
      },
      err => {
        this.router.navigate(['dashboard']);
        // @hakant: Fix this issue.
        // console.log('Something went wrong!');
      });
  }

  skip() {
    this.router.navigate(['dashboard']);
  }
}

