import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
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
      private toastr: ToastrService,
      private router:Router
    ) {
      this.form = this.fb.group({
        amount: ['', Validators.required],
        remark: ['self transfer']
      });
  
      this.form1 = this.fb.group({
        regid: ['', Validators.required],
        amount: ['', Validators.required],
        remark: ['transfer to other user'],
        wallettyoe:['', Validators.required]
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
      console.log("payload:",payload);
      this.api.selfTransfer(payload).subscribe({
        next: (res: any) => {
          
          this.toastr.success('Self Transfer Successful!', 'Success');
          this.form.reset();
          this.GetselfTransfer(); // Refresh list
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/transfer']);
          }); 
        },
        error: (err) => {
          this.toastr.error(err?.error?.message || 'Something went wrong.', 'Error');
        }
      });
    }
  
    GetselfTransfer() {
      this.api.getselfTransfer().subscribe((res: any) => {
        console.log("resself;",res);

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
        remark: this.form1.value.remark,
        wallettyoe: this.form1.value.wallettyoe
      };
  
      this.api.walletTransfer(payload).subscribe({
        next: (res: any) => {
          this.toastr.success('Wallet Transfer Successful!', 'Success');
          this.form1.reset();
          this.idData = null;
          this.GetWalletTransfer();
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/transfer']);
          }); 
        },
        error: (err) => {
          this.toastr.error(err?.error?.message || 'Transfer failed.', 'Error');
        }
      });
    }
  
    GetWalletTransfer() {
      this.api.getWalletTransfer().subscribe((res: any) => {
          console.log(res);
          
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
  
  // Clear existing data
  this.idData = null;
  this.errorMessage = null;

  // Check if regid matches self
  if (regid === this.pffdata?.regid) {
    this.errorMessage = 'You cannot transfer to your own ID.';
    return;
  }

  if (regid && regid.length >= 4) {
    this.GetregistredData(regid);
  }
}
formatAmount(event: any, formName: 'form' | 'form1') {
  let value = event.target.value;

  // allow only numbers and decimal
  value = value.replace(/[^0-9.]/g, '');

  // restrict to one decimal point
  if ((value.match(/\./g) || []).length > 1) {
    value = value.substring(0, value.length - 1);
  }

  // restrict to 2 decimal places
  if (value.includes('.')) {
    const [intPart, decPart] = value.split('.');
    if (decPart.length > 2) {
      value = intPart + '.' + decPart.substring(0, 2);
    }
  }

  event.target.value = value;
  if (formName === 'form') {
    this.form.get('amount')?.setValue(value, { emitEvent: false });
  } else {
    this.form1.get('amount')?.setValue(value, { emitEvent: false });
  }
}


  }
  