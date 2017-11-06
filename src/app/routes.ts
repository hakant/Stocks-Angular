import { Routes } from '@angular/router';

import { IntroductionComponent } from './introduction/introduction.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const appRoutes: Routes = [
    { path: '', redirectTo: '/introduction', pathMatch: 'full' },
    { path: 'introduction', component: IntroductionComponent },
    { path: 'dashboard', component: DashboardComponent }
];
