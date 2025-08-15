import { Component,OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
declare var $: any;
@Component({
  selector: 'app-sponsor-income',
  templateUrl: './sponsor-income.component.html',
  styleUrls: ['./sponsor-income.component.scss']
})
export class SponsorIncomeComponent {
  sdata:any;
 
    constructor(private api:UserService){
    }
    ngOnInit() {
  
      this.SponsorIncome();
    }
   

    SponsorIncome(){
      this.api.sponsorIncome().subscribe((res:any)=>{
          console.log("sdata:",res);
          this.sdata=res.data
          console.log("pffdata:",this.sdata);
      })
    }
  
 
  
  
  }
  
