import { Component } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {

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
  
}
