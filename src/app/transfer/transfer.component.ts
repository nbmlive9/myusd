import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent {



  

    // Forms
    form: FormGroup;
    form1: FormGroup;
  
    // Profile
    pffdata: any;
    idData: any;
    errorMessage: string | null = null;
  
    // Self Transfer
    sTransferData: any[] = [];
    sPaginatedData: any[] = [];
    sCurrentPage = 1;
  
    // Wallet Transfer
    wdata: any[] = [];
    wPaginatedData: any[] = [];
    wCurrentPage = 1;
  
  
  
    // Pagination config
    itemsPerPage = 10;

    constructor(
      private api: UserService,
      private fb: FormBuilder,
      private toastr: ToastrService
    ) {
      this.form = this.fb.group({
        amount: ['', Validators.required],
        remark: ['self transfer']
      });
  
      this.form1 = this.fb.group({
        regid: ['', Validators.required],
        amount: ['', Validators.required],
        remark: ['transfer to other user']
      });
    }
  
    ngOnInit(): void {
      this.getProfileData();
      this.GetselfTransfer();
      this.GetWalletTransfer();
    }
  
    // ------------------ Profile ------------------
  
    getProfileData() {
      this.api.getProfiledata().subscribe((res: any) => {
        this.pffdata = res.data[0];
      });
    }
  
    // ------------------ Self Transfer ------------------
  
    SelfTransfer() {
      const payload = {
        amount: this.form.value.amount,
        remark: this.form.value.remark
      };
  
      this.api.selfTransfer(payload).subscribe({
        next: (res: any) => {
          this.toastr.success('Self Transfer Successful!', 'Success');
          this.form.reset();
          this.GetselfTransfer(); // Refresh list
        },
        error: (err) => {
          this.toastr.error(err?.error?.message || 'Something went wrong.', 'Error');
        }
      });
    }
  
    GetselfTransfer() {
      this.api.getselfTransfer().subscribe((res: any) => {
        this.sTransferData = res.data || [];
        this.setSelfPage(1);
      });
    }
  
    setSelfPage(page: number) {
      this.sCurrentPage = page;
      const start = (page - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      this.sPaginatedData = this.sTransferData.slice(start, end);
    }
  
    get sTotalPages(): number {
      return Math.ceil(this.sTransferData.length / this.itemsPerPage);
    }
  
    // ------------------ Wallet Transfer ------------------
  
    WalletTransfer() {
      const payload = {
        regid: this.form1.value.regid,
        amount: this.form1.value.amount,
        remark: this.form1.value.remark
      };
  
      this.api.walletTransfer(payload).subscribe({
        next: (res: any) => {
          this.toastr.success('Wallet Transfer Successful!', 'Success');
          this.form1.reset();
          this.idData = null;
          this.GetWalletTransfer();
        },
        error: (err) => {
          this.toastr.error(err?.error?.message || 'Transfer failed.', 'Error');
        }
      });
    }
  
    GetWalletTransfer() {
      this.api.getWalletTransfer().subscribe((res: any) => {
        this.wdata = res.data || [];
        this.setWalletPage(1);
      });
    }
  
    setWalletPage(page: number) {
      this.wCurrentPage = page;
      const start = (page - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      this.wPaginatedData = this.wdata.slice(start, end);
    }
  
    get wTotalPages(): number {
      return Math.ceil(this.wdata.length / this.itemsPerPage);
    }
  
    // ------------------ Received Wallet ------------------
  
  
  
    // ------------------ RegID Lookup ------------------
  
    GetregistredData(id: any) {
      this.errorMessage = null;
      this.api.getregiddata(id).subscribe({
        next: (res: any) => {
          if (res?.data?.length > 0) {
            this.idData = res.data[0];
            this.errorMessage = null;
          } else {
            this.idData = null;
            this.errorMessage = 'User not found.';
          }
        },
        error: (err) => {
          this.idData = null;
          this.errorMessage = err?.error?.message || 'Something went wrong.';
        }
      });
    }
  
    onRegIdKeyup() {
      const regid = this.form1.get('regid')?.value;
      if (regid && regid.length >= 4) {
        this.GetregistredData(regid);
      } else {
        this.idData = null;
        this.errorMessage = null;
      }
    }
  }
  