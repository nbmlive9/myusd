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

  constructor(private api:UserService,private fb:FormBuilder, private toastr:ToastrService,private router:Router ){
    this.form = this.fb.group({
      regid: ['', Validators.required],
      amount: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getProfileData();
 
  }
  getProfileData() {
    this.api.getProfiledata().subscribe((res: any) => {
      console.log("pdata:",res);
      
      this.pffdata = res.data[0];
    });
  }

  UpgradeTransfer() {
    const payload = {
      regid: this.form.value.regid,
      amount: this.form.value.amount
    };
    console.log("payload:",payload);
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

}


