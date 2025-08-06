import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss']
})
export class WithdrawComponent {
  dashboarddata: any;
  homedata: any;
  pfdata: any;

  constructor(private api:UserService,private router:Router,private fb:FormBuilder) {

  }
  ngOnInit() {
    this.Home();
  }
  Home() {
    this.api.home().subscribe({
      next: (res) => {
        console.log('Home API response:', res);
        this.dashboarddata=res;
        this.homedata=this.dashboarddata.data;
        this.pfdata=this.dashboarddata.data.profiledata;
        console.log("home:",this.homedata);

      },
      error: (err) => {
        console.error('Home API error:', err);
      }
    });
  }
  enteredAmount: any | null = null;
  receivableAmount: number = 0;

  onAmountChange() {
    if (this.enteredAmount && this.enteredAmount >= 10) {
      const fee = (this.enteredAmount * 10) / 100;
      this.receivableAmount = this.enteredAmount - fee;
    } else {
      this.receivableAmount = 0;
    }
  }
}
