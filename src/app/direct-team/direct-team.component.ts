import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-direct-team',
  templateUrl: './direct-team.component.html',
  styleUrls: ['./direct-team.component.scss']
})
export class DirectTeamComponent implements OnInit {

  data1: any[] = [];         // Full data from API
  filteredData: any[] = [];  // Data after filter

  // Pagination variables
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 0;

  selectedFilter: string = '';  // For dropdown filter

  constructor(private api: UserService) {}

  ngOnInit(): void {
    this.getdata();
  }

  getdata(): void {
    this.api.DirectTeam().subscribe((res: any) => {
      // console.log("directteam:", res);
      this.data1 = res.data || [];
      this.filteredData = [...this.data1];
      this.updatePagination();
    });
  }

  filterTeam(): void {
    if (this.selectedFilter === '') {
      this.filteredData = [...this.data1];
    } else {
      this.filteredData = this.data1.filter(item => item.boardstatus === this.selectedFilter);
    }
    this.currentPage = 1; // Reset to first page after filtering
    this.updatePagination();
  }

  // Pagination logic
  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);
  }

  get paginatedData() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredData.slice(start, start + this.itemsPerPage);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
  printTable() {
    const printContent = document.getElementById('print-section')?.innerHTML;
    const WindowPrt = window.open('', '', 'width=900,height=650');
    WindowPrt?.document.write(`
      <html>
        <head>
          <title>Print Table</title>
          <style>
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: center; }
            th { background: #f8f9fa; }
          </style>
        </head>
        <body>${printContent}</body>
      </html>
    `);
    WindowPrt?.document.close();
    WindowPrt?.print();
  }
  
}
