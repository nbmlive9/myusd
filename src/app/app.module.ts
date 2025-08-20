import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Required for Toastr

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OrganizationChartModule } from 'primeng/organizationchart';
// Component imports
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WalletComponent } from './wallet/wallet.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { TeamLeftComponent } from './team-left/team-left.component';
import { TeamRightComponent } from './team-right/team-right.component';
import { TreeViewComponent } from './tree-view/tree-view.component';
import { SponsorIncomeComponent } from './sponsor-income/sponsor-income.component';
import { MatchingIncomeComponent } from './matching-income/matching-income.component';
import { ReportsComponent } from './reports/reports.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { DepositComponent } from './deposit/deposit.component';
import { TransferComponent } from './transfer/transfer.component';
import { ReceivedComponent } from './received/received.component';
import { DirectTeamComponent } from './direct-team/direct-team.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { AuthReferShareComponent } from './auth-refer-share/auth-refer-share.component';
import { TreeRegistrationComponent } from './tree-registration/tree-registration.component';
import { QRCodeComponent } from 'angularx-qrcode';
import { CompanyDasboardComponent } from './company-dasboard/company-dasboard.component';
import { UpgradeTransferComponent } from './upgrade-transfer/upgrade-transfer.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    LayoutComponent,
    DashboardComponent,
    WalletComponent,
    SignInComponent,
    SubscriptionComponent,
    TeamLeftComponent,
    TeamRightComponent,
    TreeViewComponent,
    SponsorIncomeComponent,
    MatchingIncomeComponent,
    ReportsComponent,
    WithdrawComponent,
    DepositComponent,
    TransferComponent,
    ReceivedComponent,
    DirectTeamComponent,
    AuthReferShareComponent,
    TreeRegistrationComponent,
    CompanyDasboardComponent,
    UpgradeTransferComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule, OrganizationChartModule,
      ConfirmDialogModule,
        ConfirmPopupModule,
        ColorPickerModule,
        ContextMenuModule, TagModule,QRCodeComponent,
        DataViewModule,
        DialogModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      closeButton: true,
      progressBar: true,
      preventDuplicates: true
    }),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }