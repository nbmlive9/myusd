import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss']
})
export class WithdrawComponent {
  dashboarddata: any;
  homedata: any;
  pfdata: any;
// feeForm: FormGroup;
  fee: number | null = null;
  loading = false;
  errorMsg = '';

  withdrawForm: FormGroup;
  submitting = false;

  successMsg = '';

  private apiKey = 'PN033X5-111M6Z6-MD7XF60-7Q5W7RW'; 


  constructor(private api:UserService,private router:Router,private fb:FormBuilder, private http:HttpClient, private token:TokenService) {
  //  this.feeForm = this.fb.group({
  //     amount: ['']
  //   });
  this.withdrawForm = this.fb.group({
      amount: [''],
      wallet: ['']
    });
  }
  ngOnInit() {
    this.Home();
        this.withdrawForm.get('amount')?.valueChanges.subscribe(val => {
      if (val >= 5) this.calculateFee(val);
      else this.fee = null;
    });

  }

  calculateFee(amount: number) {
    const url = `https://api.nowpayments.io/v1/payout/fee?currency=USDTBEP20&amount=${amount}`;
   const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${this.token.getToken()}`, // <-- required
  'x-api-key': this.apiKey   // optional, if needed
});

    this.http.get<any>(url, { headers }).subscribe({
      next: (res) => this.fee = res.fee,
      error: (err) => console.error('Fee calculation error:', err)
    });
  }

  withdraw() {
  this.errorMsg = '';
  this.successMsg = '';

  const amount = this.withdrawForm.value.amount;
  const wallet = this.withdrawForm.value.wallet;

  if (!amount || amount < 5) {
    this.errorMsg = 'Minimum withdrawal amount is $5';
    return;
  }
  if (!wallet) {
    this.errorMsg = 'Wallet address is required';
    return;
  }

  this.submitting = true;

  const url = 'https://api.nowpayments.io/v1/payout';
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'x-api-key': this.apiKey
  });

  const payload = {
    amount: amount,
    currency: 'USDTBEP20',
    address: wallet,
    ipn_callback_url: 'https://yourapp.com/payout/callback'
  };

  this.http.post<any>(url, payload, { headers }).subscribe({
    next: (res) => {
      console.log('Withdraw response:', res);
      this.successMsg = `Withdrawal submitted! Transaction ID: ${res.id}`;
      this.submitting = false;
      this.withdrawForm.reset();
      this.fee = null;

      // ✅ Call backend to deduct from user wallet
      this.api.WithdrawWallet({ 
        amount: amount.toString()
      }).subscribe((res:any) => {
        console.log('Backend withdraw response:', res);
      });
    },
    error: (err) => {
      console.error('Withdrawal error:', err);
      this.errorMsg = 'Withdrawal failed. Try again.';
      this.submitting = false;
    }
  });
}


  Home() {
    this.api.home().subscribe({
      next: (res) => {
        console.log('Home API response:', res);
        this.dashboarddata=res;
        this.homedata=this.dashboarddata.data;
        this.pfdata=this.dashboarddata.data.profiledata;
        console.log("home:",this.homedata);

      },
      error: (err) => {
        console.error('Home API error:', err);
      }
    });
  }
  enteredAmount: any | null = null;
  receivableAmount: number = 0;


  onAmountChange() {
    if (this.enteredAmount && this.enteredAmount >= 5) {
      const fee = (this.enteredAmount * 0) / 100;
      this.receivableAmount = this.enteredAmount - fee;
    } else {
      this.receivableAmount = 0;
    }
  }

  formatAmount(event: any) {
    let value = event.target.value;
  
    // allow only numbers and decimal
    value = value.replace(/[^0-9.]/g, '');
  
    // restrict to only one decimal point
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
    this.withdrawForm.get('amount')?.setValue(value, { emitEvent: false });
  }
  
}
