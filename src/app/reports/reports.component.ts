import { Component,OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
declare var $: any;

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {
  treport: any;
  dreport: any;
  constructor(private api:UserService){
  }
  ngOnInit() {

    this.getTodayReport();
    this.getTotalReport();
  }
  ngAfterViewInit() {
    $('#startDate').datepicker({
      format: 'dd-mm-yyyy',
      autoclose: true,
      todayHighlight: true
    });
  
    $('#endDate').datepicker({
      format: 'dd-mm-yyyy',
      autoclose: true,
      todayHighlight: true
    });
  }
  
  getTotalReport(){
    this.api.totalReport().subscribe((res:any)=>{
        console.log("total:",res);
        this.treport=res.data
        console.log("pffdata:",this.treport);
    })
  }

  getTodayReport(){
    this.api.todayReport().subscribe((res:any)=>{
        console.log("today:",res);
        this.dreport=res.data
        console.log("dport:",this.dreport);
    })
  }


}
