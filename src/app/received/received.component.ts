import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-received',
  templateUrl: './received.component.html',
  styleUrls: ['./received.component.scss']
})
export class ReceivedComponent implements OnInit {

  rwallet: any[] = [];
  rPaginatedData: any[] = [];
  rCurrentPage = 1;
  itemsPerPage = 10;

  constructor(
    private api: UserService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.GetReceivedWallet();
  }

  GetReceivedWallet(): void {
    this.api.receivedWallet().subscribe({
      next: (res: any) => {
        this.rwallet = res.data || [];
        console.log("rwallet:", res);
        this.setReceivedPage(1);
      },
      error: (err) => {
        console.error('Error fetching received wallet data:', err);
        this.toastr.error('Failed to load received wallet data');
      }
    });
  }

  setReceivedPage(page: number): void {
    this.rCurrentPage = page;
    const start = (page - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.rPaginatedData = this.rwallet.slice(start, end);
  }

  get rTotalPages(): number {
    return Math.ceil(this.rwallet.length / this.itemsPerPage);
  }
}
