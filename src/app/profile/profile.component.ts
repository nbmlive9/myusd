import { Component } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  dashboarddata: any;
  homedata:any;
  constructor(private api:UserService){}


  ngOnInit() {
    this.Home();
  }
  
    currentTab: 'profile' | 'password' = 'profile';
  
    switchTab(tab: 'profile' | 'password') {
      this.currentTab = tab;
    }
    


    Home() {
      this.api.home().subscribe({
        next: (res) => {
          console.log('Home API response:', res);
          this.dashboarddata=res
          this.homedata=this.dashboarddata.data
          console.log("home:",this.homedata);
        },
        error: (err) => {
          console.error('Home API error:', err);
        }
      });
    }


  }

