import { Component,OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
declare var $: any;

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {
 startDate: string = '';
endDate: string = '';
treport: any[] = [];
filteredReport: any[] = [];
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
        this.filteredReport = [...this.treport];
    })
  }

  filterByDate() {
  if (!this.startDate && !this.endDate) {
    this.filteredReport = [...this.treport];
    return;
  }

  const start = this.startDate ? new Date(this.startDate) : null;
  const end = this.endDate ? new Date(this.endDate) : null;

  this.filteredReport = this.treport.filter(item => {
    const itemDate = new Date(item.cdate);
    if (start && end) {
      return itemDate >= start && itemDate <= end;
    } else if (start) {
      return itemDate >= start;
    } else if (end) {
      return itemDate <= end;
    }
    return true;
  });
}

resetFilter() {
  this.startDate = '';
  this.endDate = '';
  this.filteredReport = [...this.treport];
}

  getTodayReport(){
    this.api.todayReport().subscribe((res:any)=>{
        console.log("today:",res);
        this.dreport=res.data
        console.log("dport:",this.dreport);
    })
  }


}
