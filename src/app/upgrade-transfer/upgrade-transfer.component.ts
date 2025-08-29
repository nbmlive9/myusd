import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upgrade-transfer',
  templateUrl: './upgrade-transfer.component.html',
  styleUrls: ['./upgrade-transfer.component.scss']
})
export class UpgradeTransferComponent {
  form:FormGroup
  pffdata: any;
  errorMessage: any;
  idData:any
  // / Wallet Transfer
  wdata: any;
  wPaginatedData: any[] = [];
  wCurrentPage = 1;



  // Pagination config
  itemsPerPage = 10;

  constructor(private api:UserService,private fb:FormBuilder, private toastr:ToastrService,private router:Router ){
    this.form = this.fb.group({
      regid: ['', Validators.required],
      amount: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getProfileData();
    this.GetWalletTransfer()
 
  }
  getProfileData() {
    this.api.getProfiledata().subscribe((res: any) => {
      // console.log("pdata:",res);
      this.pffdata = res.data[0];
    });
  }

  UpgradeTransfer() {
    const payload = {
      regid: this.form.value.regid,
      amount: this.form.value.amount
    };
    // console.log("payload:",payload);
    this.api.upgradeTransfer(payload).subscribe({
      next: (res: any) => {
        
        this.toastr.success('upgrade  Transfer Successful!', 'Success');
        this.form.reset();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/upgradetransfer']);
        }); 
      },
      error: (err) => {
        this.toastr.error(err?.error?.message || 'Something went wrong.', 'Error');
      }
    });
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
const regid = this.form.get('regid')?.value;

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

formatAmount(event: any) {
  let value = event.target.value;

  // Allow only numbers and decimal
  value = value.replace(/[^0-9.]/g, '');

  // Restrict to only one decimal point
  if ((value.match(/\./g) || []).length > 1) {
    value = value.substring(0, value.length - 1);
  }

  // Restrict to 2 decimal places
  if (value.includes('.')) {
    const [integer, decimal] = value.split('.');
    if (decimal.length > 2) {
      value = integer + '.' + decimal.substring(0, 2);
    }
  }

  // update UI input
  event.target.value = value;

  // ✅ update the form correctly
  this.form.get('amount')?.setValue(value, { emitEvent: false });
}
GetWalletTransfer() {
  this.api.getWalletTransfer().subscribe((res: any) => {
    // console.log(res);

    this.wdata = res.data.filter((item: any) => item.waltype === 'upgrade');

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



}


