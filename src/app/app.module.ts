import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { appRoutes } from './routes';

import { IntroductionComponent } from './introduction/introduction.component';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { StocksService } from './services/stocks.service';
import { ModalComponent } from './shared/modal.component';
import { TransactionComponent } from './transactions/transaction/transaction.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    IntroductionComponent,
    ModalComponent,
    TransactionComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule.forRoot()
  ],
  providers: [
    StocksService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
