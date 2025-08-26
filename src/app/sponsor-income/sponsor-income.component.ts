import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-sponsor-income',
  templateUrl: './sponsor-income.component.html',
  styleUrls: ['./sponsor-income.component.scss']
})
export class SponsorIncomeComponent implements OnInit {
  @ViewChild('tableToPrint') tableToPrint!: ElementRef;

  sdata: any[] = [];
  paginatedData: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(private api: UserService) {}

  ngOnInit() {
    this.SponsorIncome();
  }

  SponsorIncome() {
    this.api.sponsorIncome().subscribe((res: any) => {
      console.log(res);
      
      this.sdata = res.data || [];
      this.setPage(1);
    });
  }

  // ✅ Pagination logic
  setPage(page: number) {
    this.currentPage = page;
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedData = this.sdata.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.sdata.length / this.itemsPerPage);
  }

  // ✅ Print Table
  printTable() {
    let printContents = this.tableToPrint.nativeElement.innerHTML;
    let popupWin = window.open('', '_blank', 'width=900,height=650');
    popupWin!.document.open();
    popupWin!.document.write(`
      <html>
        <head>
          <title>Sponsor Income</title>
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
