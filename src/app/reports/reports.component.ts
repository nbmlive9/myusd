import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
declare var $: any;

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  startDate: string = '';
  endDate: string = '';
  treport: any[] = [];
  filteredReport: any[] = [];
  dreport: any;

  // pagination
  page: number = 1;
  itemsPerPage: number = 10;

  constructor(private api: UserService) {}

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

  // --- API Calls ---
  getTotalReport() {
    this.api.totalReport().subscribe((res: any) => {
      // console.log('total:', res);
      this.treport = res.data;
      this.filteredReport = [...this.treport];
    });
  }

  getTodayReport() {
    this.api.todayReport().subscribe((res: any) => {
      // console.log('today:', res);
      this.dreport = res.data;
    });
  }

  // --- Filtering ---
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

    // reset to page 1 after filter
    this.page = 1;
  }

  resetFilter() {
    this.startDate = '';
    this.endDate = '';
    this.filteredReport = [...this.treport];
    this.page = 1;
  }

  // --- Pagination Helpers ---
  get paginatedReport() {
    const startIndex = (this.page - 1) * this.itemsPerPage;
    return this.filteredReport.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.filteredReport.length / this.itemsPerPage);
  }

  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.page = page;
    }
  }
}
