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
  pffdata: any;
  currentTab: 'profile' | 'password' = 'profile';

  constructor(private api:UserService){}


  ngOnInit() {
    this.getdata();
  }
  
  
    switchTab(tab: 'profile' | 'password') {
      this.currentTab = tab;
    }
    

    getdata(){
      this.api.getProfiledata().subscribe((res:any)=>{
          console.log("profiledata:",res);
          this.pffdata=res.data[0];
          console.log("pffdata:",this.pffdata);
      })
    }

    save(){
    }
    edit(){
    }
   

  }

