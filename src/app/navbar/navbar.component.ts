import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { StocksService } from '../services/stocks.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  netLiquidationValue: number;
  cash: number;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private stocksService: StocksService) { }

  ngOnInit() {
    this.subscription = this.stocksService.stateObservable.subscribe((state) => {
      this.netLiquidationValue = state.NetLiquidationValue;
      this.cash = state.CashValue;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  isIntro(): boolean {
    return this.router.url.startsWith('/introduction');
  }
}
