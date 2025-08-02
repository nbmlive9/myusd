import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WalletComponent } from './wallet/wallet.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { TeamLeftComponent } from './team-left/team-left.component';
import { TeamRightComponent } from './team-right/team-right.component';
import { TreeViewComponent } from './tree-view/tree-view.component'; // Add this import
import { ReportsComponent } from './reports/reports.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { TransferComponent } from './transfer/transfer.component';
import { ReceivedComponent } from './received/received.component';
import { DepositComponent } from './deposit/deposit.component';
import { SponsorIncomeComponent } from './sponsor-income/sponsor-income.component';
import { MatchingIncomeComponent } from './matching-income/matching-income.component';
import { DirectTeamComponent } from './direct-team/direct-team.component';
import { authGuard } from './service/auth.guard';
const routes: Routes = [
  // Login route - does NOT use layout
  { path: 'login', component: LoginComponent },
  { path: 'sign-in', component: SignInComponent },
  // Layout routes (shown after login)
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'wallet', component: WalletComponent , canActivate: [authGuard]},
      { path: 'profile', component: ProfileComponent , canActivate: [authGuard]},
      { path: 'subscription', component: SubscriptionComponent , canActivate: [authGuard]},
      { path: 'dashboard', component: DashboardComponent , canActivate: [authGuard]},
      {path:"leftteam",component:TeamLeftComponent , canActivate: [authGuard]},
      {path:"rightteam",component:TeamRightComponent , canActivate: [authGuard]},
      {path:"treeview",component:TreeViewComponent , canActivate: [authGuard]},
      {path:"report",component:ReportsComponent , canActivate: [authGuard]},
      {path:"deposit",component:DepositComponent , canActivate: [authGuard]},
      {path:"withdraw",component:WithdrawComponent , canActivate: [authGuard]},
      {path:"transfer",component:TransferComponent , canActivate: [authGuard]},
      {path:"recieved",component:ReceivedComponent , canActivate: [authGuard]},
      {path:"direct",component:ReportsComponent , canActivate: [authGuard]},
      {path:"sponsorincome",component:SponsorIncomeComponent , canActivate: [authGuard]},
      {path:"matchingincome",component:MatchingIncomeComponent , canActivate: [authGuard]},
      {path:"direct-team",component:DirectTeamComponent , canActivate: [authGuard]},
    ]
  },

  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
