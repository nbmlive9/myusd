import { Component, ElementRef,ViewChild } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-team-right',
  templateUrl: './team-right.component.html',
  styleUrls: ['./team-right.component.scss']
})
export class TeamRightComponent {
  @ViewChild('tableToPrint') tableToPrint!: ElementRef;

  data1: any[] = [];
  filteredData: any[] = [];
  selectedFilter: string = '';

  // Pagination variables
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 0;

  constructor(private api: UserService) {}

  ngOnInit() {
    this.api.getrightTeam().subscribe((res: any) => {
      // console.log(res);
      this.data1 = res.data || [];
      this.filteredData = [...this.data1];
      this.updatePagination();
    });
  }

  filterTeam(): void {
    if (this.selectedFilter === '') {
      this.filteredData = [...this.data1];
    } else {
      this.filteredData = this.data1.filter((item: any) => item.board === this.selectedFilter);
    }
    this.currentPage = 1; // Reset to first page after filter
    this.updatePagination();
  }

  // Calculate total pages
  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);
  }

  // Get current page's data
  get paginatedData() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredData.slice(start, start + this.itemsPerPage);
  }

  // Change page
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }



  printTable() {
    const printContents = this.tableToPrint.nativeElement.innerHTML;
    const popupWin = window.open('', '_blank', 'width=900,height=650');
    popupWin!.document.open();
    popupWin!.document.write(`
      <html>
        <head>
          <title>Print Table</title>
          <style>
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid #333;
              padding: 8px;
              text-align: center;
            }
            th {
              background-color: #f8f9fa;
            }
          </style>
        </head>
        <body onload="window.print();window.close()">
          ${printContents}
        </body>
      </html>
    `);
    popupWin!.document.close();
  }
}
