import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
// 
@Component({
  selector: 'app-company-dasboard',
  templateUrl: './company-dasboard.component.html',
  styleUrls: ['./company-dasboard.component.scss']
})
export class CompanyDasboardComponent {
  dashboardData: any = {};
  withdrawUsersData: any = [];
  tuser: any;
  profileform: FormGroup;
  pffdata: any;
  isEdit: boolean = false;
  countries: string[] = [];
  codes: string[] = [];
  userid:any;
  totalmembers:any;
  form:FormGroup;
    errorMessage: any;
  idData: any;
  constructor(private api: UserService, private fb: FormBuilder, private toast: ToastrService,private router:Router) {
    this.profileform = this.fb.group({
      regid: [''],   // <-- Add this
      name: [''],
      email: [''],
      country: [''],
      wallet1: ['']
    });

    this.form = this.fb.group({
      regid: ['', Validators.required],   // <-- Add this
      points: ['', Validators.required],
    });
    
  }

  ngOnInit() {
    this.getDashboard();
    this.getWithdrawUsers();
    this.getWithdrawPaid();
    this.Totalusers();  
    this.getCountries();
    this.TotalMembers();

  }

  getDashboard() {
    this.api.dashboard().subscribe({
      next: (res: any) => {
        // console.log(res);
        if (res.status === 1) this.dashboardData = res.data;
      },
      error: (err) => console.error('Dashboard API error:', err),
    });
  }

  getWithdrawUsers() {
    this.api.withdrawUsers().subscribe({
      next: (res: any) => this.withdrawUsersData = res.data,
      error: (err) => console.error('Withdraw API error:', err),
    });
  }

  getWithdrawPaid() {
    this.api.withdrawUsers().subscribe({
      next: (res: any) => {
        if (res.status === 1) this.withdrawUsersData = res.data;
      },
      error: (err) => console.error('Withdraw API error:', err),
    });
  }



  Totalusers(page: number = 1) {
    this.api.totalusers(page).subscribe({
      next: (res: any) => {
        this.tuser = {
          data: res.data.data,                // 👈 the actual array
          nextpage: res.data.nextpage,        // 👈 URL string
          previouspage: res.data.previouspage // 👈 URL string or null
        };
        // console.log("tuser:", this.tuser);
      },
      error: (err) => console.error('Total Users API error:', err),
    });
  }
  
  getPageNumber(url: string): number | null {
    if (!url) return null;
    try {
      const params = new URL(url).searchParams;
      return Number(params.get("page"));
    } catch (e) {
      console.error("Invalid URL:", url);
      return null;
    }
  }
  
  loadPage(url: string) {
    const page = this.getPageNumber(url);
    if (page) {
      this.Totalusers(page);
    }
  }
  
  

  
  

  openProfile(item: any) {
    // console.log("item:",item.regid);
    this.userid=item.regid
    
    this.isEdit = false;   
    this.pffdata = item;   

    this.profileform.patchValue({
      regid: item.regid,  // <-- Add this
      name: item.name,
      email: item.email,
      country: item.country,
      wallet1: item.wallet1
    });
    
    this.profileform.markAsPristine();
  }

  edit() {
    this.isEdit = true;
  }
  
  save() {
    const payload = this.profileform.value;
    const id = this.userid;   
  
    this.api.cupdateprofile(id, payload).subscribe({
      next: (res: any) => {
        // console.log("updateprofile:", res);
        if (res.status === 1) {
          this.toast.success("Profile updated successfully");
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/dashboard']);
          });
          this.pffdata = { ...this.pffdata, ...payload };  
          this.isEdit = false;  
        } else {
          this.toast.error("Update failed");
        }
      },
      error: (err) => {
        console.error("updateprofile error:", err);
        this.toast.error("Error updating profile");
      }
    });
  }

  Active(): void {
      if (this.form.invalid) {
        this.form.markAllAsTouched(); // highlight errors
        return;
      }
      const form = this.form.value;
      const payload = {
        regid: form.regid,
        points: form.points,
      };
      this.api.ActivatePremiumId(payload).subscribe({
        next: (res: any) => {
          // console.log('Registration Response:', res);
          this.toast.success(res?.message || 'Activate Premium Account successful ✅', 'Success');
          this.form.reset();
        },
        error: (err) => {
          console.error('Activate Premium Account error:', err);
          this.toast.error(err?.error?.message || 'Activate Premium Account failed. Please try again.', 'Error');
        }
      });
    }

  getCountries() {
    this.api.getCountries().subscribe({
      next: (res: any) => {
        this.codes = res.map((c: any) => c.cca2).filter(Boolean);
        this.countries = res.map((c: any) => c.name?.common).filter(Boolean).sort();
      },
      error: (err) => console.error('API Error:', err)
    });
  }

  TotalMembers() {
    this.api.totalMembers().subscribe({
      next: (res: any) => {
        this.totalmembers=res
        // console.log("Total Members:", res);
      },
      error: (err) => console.error("API Error:", err)
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
    if (regid && regid.length >= 4) {
      this.GetregistredData(regid);
    } else {
      this.idData = null;
      this.errorMessage = null;
    }
  }
  
}
