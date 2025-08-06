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
   
    MatchIncome(){
      this.api.matchIncome().subscribe((res:any)=>{
          console.log("sdata:",res);
          this.mdata=res.data
          console.log("pffdata:",this.mdata);
      })
    }
  
 
  
  
  
}
<<<<<<< HEAD
// 
=======
  

>>>>>>> balu
