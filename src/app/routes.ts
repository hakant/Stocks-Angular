import { Routes } from '@angular/router';

import { IntroductionComponent } from './introduction/introduction.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransactionComponent } from './transactions/transaction/transaction.component';

export const appRoutes: Routes = [
    { path: '', redirectTo: '/introduction', pathMatch: 'full' },
    { path: 'introduction', component: IntroductionComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'transactions', component: TransactionComponent}
];
