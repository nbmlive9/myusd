import { Component } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-company-dasboard',
  templateUrl: './company-dasboard.component.html',
  styleUrls: ['./company-dasboard.component.scss']
})
export class CompanyDasboardComponent {
  dashboardData: any = {};
  withdrawUsersData: any = [];
  userId: any;
  tuser: any;

  constructor(private api: UserService) {}

  ngOnInit() {
    this.getDashboard();
    this.getWithdrawUsers();
    this.getWithdrawPaid();
    this.Totalusers();
  }

  getDashboard() {
    this.api.dashboard().subscribe({
      next: (res: any) => {
        console.log('Dashboard response:', res);
        if (res.status === 1) {
          this.dashboardData = res.data;
        }
      },
      error: (err) => {
        console.error('Dashboard API error:', err);
      },
    });
  }

  getWithdrawUsers() {
    this.api.withdrawUsers().subscribe({
      next: (res: any) => {
        console.log('Withdraw users:', res);
       
          this.withdrawUsersData = res.data; // assuming res.data is an array
        
      },
      error: (err) => {
        console.error('Withdraw API error:', err);
      },
    });
  }
  getWithdrawPaid() {
    this.api.withdrawUsers().subscribe({
      next: (res: any) => {
        console.log('getWithdrawPaid:', res);
        if (res.status === 1) {
          this.withdrawUsersData = res.data; // assuming res.data is an array
        }
      },
      error: (err) => {
        console.error('Withdraw API error:', err);
      },
    });
  }
  Totalusers() {
    this.api.totalusers().subscribe({
      next: (res: any) => {
        console.log('totalusers:', res);
        this.tuser=res.data
     
      },
      error: (err) => {
        console.error('Withdraw API error:', err);
      },
    });
  }

UPdateprofile(){
  this.api.cupdateprofile(this.userId).subscribe({
    next: (res: any) => {
      console.log('Profile update response:', res);
    },
    error: (err) => {
      console.error('Profile update error:', err);
    }
  });
}


  
}
