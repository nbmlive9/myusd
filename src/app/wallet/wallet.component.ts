import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { FormBuilder,FormGroup,Validator, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent {
//   form:FormGroup;
//   form1:FormGroup;
//   dashboarddata: any;
//   homedata: any;
//   pfdata: any;
//   activationDetails: any;
//   data1: any;
//   idData: any;
//   errorMessage: string | null = null;
//   wdata: any;
//   pffdata:any;

//   constructor(private api:UserService,private fb:FormBuilder,private toastr:ToastrService){
//     this.form=this.fb.group({
//       amount:['',Validators.required],
//       remark:['self transfer']
//     })
//     this.form1=this.fb.group({
//       regid:['',Validators.required],
//      amount:['',Validators.required],
//       remark:['transfter to other user'],
//       wallettyoe:['',Validators.required]

//     })
//   }
//   ngOnInit() {
//     this.getdata();
//     this.GetselfTransfer();
//     this.GetWalletTransfer();
//   }
  
//   SelfTransfer() {
//     const payload = {
//       amount: this.form.value.amount,
//       remark: this.form.value.remark
//     };
  
//     console.log('Payload:', payload);
  
//     this.api.selfTransfer(payload).subscribe({
//       next: (res: any) => {
//         console.log('Self Transfer Success:', res);
//         this.toastr.success('Self Transfer Successful!', 'Success');
//        this.form.reset();
//       },
//       error: (err) => {
//         console.error('Self Transfer Failed:', err);
  
//         if (err.error?.message) {
//         } else {
//           this.toastr.error('Something went wrong. Please try again.', 'Error');
//         }
//       }
//     });
//   }
  
//   WalletTransfer() {
//     const payload = {
//       regid:this.form1.value.regid,
//       amount: this.form1.value.amount,
//       remark:this.form1.value.remark,
//       wallettyoe:this.form1.value.wallettyoe
//     };
//     console.log("payload:",payload);

//     this.api.walletTransfer(payload).subscribe({
//       next: (res: any) => {
//         console.log('WalletTransfer Success:', res);
//       },
//       error: (err) => {
//         console.error('Self Transfer Failed:', err);
  
//       }
//     });
//   }

//   getdata(){
//     this.api.getProfiledata().subscribe((res:any)=>{
//         console.log("profiledata:",res);
//         this.pffdata=res.data[0];
//         console.log("pffdata:",this.pffdata);
        
//     })
//   }
//   GetselfTransfer(){
//     this.api.getselfTransfer().subscribe((res:any)=>{
//         console.log("ffffff:",res);
//         // this.pfdata=res.data;
//     })
//   }
//   paginatedData: any[] = [];
//   currentPage = 1;
//   itemsPerPage = 10;
//   totalPages = 0;
  
//   GetWalletTransfer() {
//     this.api.getWalletTransfer().subscribe((res: any) => {
//       this.wdata = res;
//       this.totalPages = Math.ceil(this.wdata.data.length / this.itemsPerPage);
//       this.setPage(this.currentPage);
//     });
//   }

//   setPage(page: number) {
//     this.currentPage = page;
//     const start = (page - 1) * this.itemsPerPage;
//     const end = start + this.itemsPerPage;
//     this.paginatedData = this.wdata.data.slice(start, end);
//   }
  
//   GetregistredData(id: any) {
//     this.errorMessage = null;
//     this.api.getregiddata(id).subscribe({
//       next: (res: any) => {
//         if (res?.data?.length > 0) {
//           this.idData = res.data[0];
//           this.errorMessage = null;
//         } else {
//           this.idData = null;
//           this.errorMessage = 'User not found.';
//         }
//       },
//       error: (err) => {
//         this.idData = null;
//         this.errorMessage = err?.error?.message || 'Something went wrong.';
//       }
//     });
//   }
  

//   onRegIdKeyup() {
//     const regid = this.form1.get('regid')?.value;
//     if (regid && regid.length >= 6) { // Optional: add min length check
//       this.GetregistredData(regid);
//     } else {
//       this.idData = null;
//       this.errorMessage = null;
//     }
//   }

//   formatAmount(event: any, formName: 'form' | 'form1') {
//   let value = event.target.value;

//   // allow only numbers and decimal
//   value = value.replace(/[^0-9.]/g, '');

//   // restrict to one decimal point
//   if ((value.match(/\./g) || []).length > 1) {
//     value = value.substring(0, value.length - 1);
//   }

//   // restrict to 2 decimal places
//   if (value.includes('.')) {
//     const [intPart, decPart] = value.split('.');
//     if (decPart.length > 2) {
//       value = intPart + '.' + decPart.substring(0, 2);
//     }
//   }

//   event.target.value = value;
//   if (formName === 'form') {
//     this.form.get('amount')?.setValue(value, { emitEvent: false });
//   } else {
//     this.form1.get('amount')?.setValue(value, { emitEvent: false });
//   }
// }
  
}
