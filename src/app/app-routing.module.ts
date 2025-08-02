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
  // 
<<<<<<< HEAD
=======
  // lll
>>>>>>> pavan
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'wallet', component: WalletComponent , canActivate: [authGuard], data: { usertype: ['user'] }},
      { path: 'profile', component: ProfileComponent , canActivate: [authGuard], data: { usertype: ['user'] }},
      { path: 'subscription', component: SubscriptionComponent , canActivate: [authGuard], data: { usertype: ['user'] }},
      { path: 'dashboard', component: DashboardComponent ,canActivate: [authGuard] , data: { usertype: ['user'] }},
      {path:"leftteam",component:TeamLeftComponent , canActivate: [authGuard], data: { usertype: ['user'] }},
      {path:"rightteam",component:TeamRightComponent , canActivate: [authGuard], data: { usertype: ['user'] }},
      {path:"treeview",component:TreeViewComponent , canActivate: [authGuard], data: { usertype: ['user'] }},
      {path:"report",component:ReportsComponent , canActivate: [authGuard], data: { usertype: ['user'] }},
      {path:"deposit",component:DepositComponent , canActivate: [authGuard], data: { usertype: ['user'] }},
      {path:"withdraw",component:WithdrawComponent , canActivate: [authGuard], data: { usertype: ['user'] }},
      {path:"transfer",component:TransferComponent , canActivate: [authGuard], data: { usertype: ['user'] }},
      {path:"recieved",component:ReceivedComponent , canActivate: [authGuard], data: { usertype: ['user'] }},
      {path:"direct",component:ReportsComponent , canActivate: [authGuard], data: { usertype: ['user'] }},
      {path:"sponsorincome",component:SponsorIncomeComponent , canActivate: [authGuard], data: { usertype: ['user'] }},
      {path:"matchingincome",component:MatchingIncomeComponent , canActivate: [authGuard], data: { usertype: ['user'] }},
      {path:"direct-team",component:DirectTeamComponent , canActivate: [authGuard], data: { usertype: ['user'] }},
    ]
  },

  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
