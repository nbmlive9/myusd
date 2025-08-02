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
      { path: 'wallet', component: WalletComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'subscription', component: SubscriptionComponent },
      { path: 'dashboard', component: DashboardComponent },
      {path:"leftteam",component:TeamLeftComponent},
      {path:"rightteam",component:TeamRightComponent},
      {path:"treeview",component:TreeViewComponent},
      {path:"report",component:ReportsComponent},
      {path:"deposit",component:DepositComponent},
      {path:"withdraw",component:WithdrawComponent},
      {path:"transfer",component:TransferComponent},
      {path:"recieved",component:ReceivedComponent},
      {path:"direct",component:ReportsComponent},
      {path:"sponsorincome",component:SponsorIncomeComponent},
      {path:"matchingincome",component:MatchingIncomeComponent},
      {path:"direct-team",component:DirectTeamComponent},
    ]
  },

  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
