import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-matching-income',
  templateUrl: './matching-income.component.html',
  styleUrls: ['./matching-income.component.scss']
})
export class MatchingIncomeComponent implements OnInit {
  @ViewChild('tableToPrint') tableToPrint!: ElementRef;

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
        // console.log(res);
        
        this.mdata = res?.data || [];
        this.noData = this.mdata.length === 0;
      },
      error: (err) => {
        // console.error("API error:", err);
        this.mdata = [];
        this.noData = true;
      }
    });
  }

  // ✅ get items for current page
  get pagedData() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.mdata.slice(start, start + this.itemsPerPage);
  }

  // ✅ total pages
  get totalPages() {
    return Math.ceil(this.mdata.length / this.itemsPerPage);
  }

  // ✅ change page
  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  // ✅ print table
  printTable() {
    const printContents = this.tableToPrint.nativeElement.innerHTML;
    const popupWin = window.open('', '_blank', 'width=900,height=650');
    popupWin!.document.open();
    popupWin!.document.write(`
      <html>
        <head>
          <title>Matching Income</title>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
        </head>
        <body onload="window.print();window.close()">
          ${printContents}
        </body>
      </html>
    `);
    popupWin!.document.close();
  }
}
