import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-matching-income',
  templateUrl: './matching-income.component.html',
  styleUrls: ['./matching-income.component.scss']
})
export class MatchingIncomeComponent implements OnInit {
  mdata: any[] = [];
  noData: boolean = false;

  // pagination
  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(private api: UserService) {}

  ngOnInit() {
    this.MatchIncome();
  }

  MatchIncome() {
    this.api.matchIncome().subscribe({
      next: (res: any) => {
        this.mdata = res?.data || [];
        this.noData = this.mdata.length === 0;
      },
      error: (err) => {
        console.error("API error:", err);
        this.mdata = [];
        this.noData = true;
      }
    });
  }

  // get items for current page
  get pagedData() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.mdata.slice(start, start + this.itemsPerPage);
  }

  // total pages
  get totalPages() {
    return Math.ceil(this.mdata.length / this.itemsPerPage);
  }

  // change page
  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
}
