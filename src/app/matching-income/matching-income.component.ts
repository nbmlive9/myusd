import { Component,OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
declare var $: any;
@Component({
  selector: 'app-matching-income',
  templateUrl: './matching-income.component.html',
  styleUrls: ['./matching-income.component.scss']
})
export class MatchingIncomeComponent {

  mdata:any;
 
    constructor(private api:UserService){
    }
    ngOnInit() {
      this.MatchIncome();
    }
   
    noData: boolean = false;
    
    MatchIncome() {
      this.noData = false; // reset before loading
      this.api.matchIncome().subscribe({
        next: (res: any) => {
          console.log("sdata:", res);
          this.mdata = res?.data || [];
          this.noData = this.mdata.length === 0;
          console.log("pffdata:", this.mdata);
        },
        error: (err) => {
          console.error("API error:", err);
          this.mdata = [];
          this.noData = true;
        }
      });
    }
    
  
 
  
  
  
}
  

