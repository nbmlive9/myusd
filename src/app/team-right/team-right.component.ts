import { Component } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-team-right',
  templateUrl: './team-right.component.html',
  styleUrls: ['./team-right.component.scss']
})
export class TeamRightComponent {
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
      console.log(res);
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
}
