import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { TokenService } from './token.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
//  private readonly AUTH_API = 'https://crypturegrid.com/MYUSD/MYUSD/User/';
    private readonly AUTH_API = 'https://myusd.co/MYUSD/MYUSD//User/';
    private baseUrl = 'https://api.nowpayments.io/v1/payment';
    
  constructor(
    private http: HttpClient,
    private route: Router,
    private authService: AuthService,
    private token:TokenService
  ) {}

   // user.service.ts
// user.service.ts
getPayments(token:any): Observable<any> {
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'x-api-key': 'PN033X5-111M6Z6-MD7XF60-7Q5W7RW',
     ...(token && { Authorization: `Bearer ${token}` })
  }),
};

  const url = `${this.baseUrl}/?limit=10&page=0&sortBy=created_at&orderBy=asc&dateFrom=2020-01-01&dateTo=2025-12-31`;

  return this.http.get(url, httpOptions);
}



  register(value: {
    sponcerid: string;
    name: string;
    phone: string;
    email: string;
    password: string;
    position: string;
    country: string;
        placementid: string;
  }) {
    const token = this.token.getToken(); // ⛳ Optional: If token is required
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }) // Use token only if exists
      }),
    };

    return this.http.post(
      this.AUTH_API + 'Register',
      {
        sponcerid: value.sponcerid,
        name: value.name,
        phone: value.phone,
        email: value.email,
        password: value.password,
        position: value.position,
        country: value.country,
        placementid: value.placementid
      },
      httpOptions
    );
  }
  home() {
    const token = this.token.getToken(); 
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      }),
    };
  
    return this.http.get(this.AUTH_API + 'Home', httpOptions);
  }

  forgotPassword(value: { regid: string; email: string }) {
    const token = this.token.getToken(); // optional if required
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }) // include only if token exists
      }),
    };
    return this.http.post(
      this.AUTH_API + 'Forget_Password',
      {
        regid: value.regid,
        email: value.email,
      },
      httpOptions
    );
  }

  subscription(value: { regid: string }) {
    const token = this.token.getToken(); 
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
      }),
    };
  
    return this.http.post(
      this.AUTH_API + 'Activateid',
      {
        regid: value.regid
      },
      httpOptions
    );
  }

  DepositWallet(value: { amount: string, note:string, transno:string }) {
    const token = this.token.getToken(); 
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
      }),
    };
  
    return this.http.post(
      this.AUTH_API + 'Deposite',
      {
        amount: value.amount,
         note: value.note,
          transno: value.transno,
      },
      httpOptions
    );
  }

  ActivationData() {
    const token = this.token.getToken(); 
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      }),
    };
      return this.http.get(this.AUTH_API + 'Activation_data', httpOptions);
  }


  
  selfTransfer(value: { 
    amount:string,
    remark:string,
   }) {
    const token = this.token.getToken(); 
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
      }),
    };
  
    return this.http.post(
      this.AUTH_API + 'Wallet_SelfTransefer',
      {
        amount: value.amount,
        remark:value.remark
      },
      httpOptions
    );
  }

  walletTransfer(value: { 
    regid: string,
    amount:string,
    remark:string,

   }) {
    const token = this.token.getToken(); 
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
      }),
    };
  
    return this.http.post(
      this.AUTH_API + 'Wallet_Transefer',
      {
        regid: value.regid,
        amount:value.amount,
        remark:value.remark,
      },
      httpOptions
    );
  }

  DirectTeam() {
    const token = this.token.getToken(); 
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      }),
    };
      return this.http.get(this.AUTH_API + 'Directteam', httpOptions);
  }
  

  getProfiledata() {
    const token = this.token.getToken(); 
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      }),
    };
      return this.http.get(this.AUTH_API + 'Profile', httpOptions);
  }


  getWalletTransfer() {
    const token = this.token.getToken(); 
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      }),
    };
      return this.http.get(this.AUTH_API + 'Wallet_Transeferreport', httpOptions);
  }
  getselfTransfer() {
    const token = this.token.getToken(); 
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      }),
    };
      return this.http.get(this.AUTH_API + 'User_SelfTransreport', httpOptions);
  }
  getregiddata(id:any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
      return this.http.get(this.AUTH_API + 'Get_Userdatabyregid/'+id, httpOptions);
  }
receivedWallet() {
  const token = this.token.getToken(); 
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }),
  };
    return this.http.get(this.AUTH_API + 'Wallet_Receivereport', httpOptions);
}



totalReport() {
  const token = this.token.getToken(); 
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }),
  };
    return this.http.get(this.AUTH_API + 'Wallet_Report', httpOptions);
}
todayReport() {
  const token = this.token.getToken(); 
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }),
  };
    return this.http.get(this.AUTH_API + 'Wallet_TodayReport', httpOptions);
}


sponsorIncome() {
  const token = this.token.getToken(); 
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }),
  };
    return this.http.get(this.AUTH_API + 'Wallet_Sponsor', httpOptions);


}
matchIncome() {
  const token = this.token.getToken(); 
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }),
  };
    return this.http.get(this.AUTH_API + 'Wallet_Matching', httpOptions);
}

updateProfile(value: {
  name: string;
  country: string;
  password:string;
  email:string;
  wallet1:string;
}) {
  const token = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    }),
  };

  return this.http.post(
    this.AUTH_API + 'Profileiupdate', 

   {
    wallet1:value.wallet1,
        name: value.name,
        email:value.email,
        password:value.password,
        country:value.country,


      },
    httpOptions
  );
}


getleftTeam() {
  const token = this.token.getToken(); 
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }),
  };
    return this.http.get(this.AUTH_API + 'Left_members', httpOptions);
}

  getrightTeam() {
  const token = this.token.getToken(); 
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }),
  };
    return this.http.get(this.AUTH_API + 'Right_members', httpOptions);
}

UserTreeView(id:any): Observable<any>{
const token1 = this.token.getToken();
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token1
  })
}
return this.http.get(
  this.AUTH_API +`Tree_view/${id}` ,
  httpOptions
);
}

UserTreeViewDataById(id:any): Observable<any>{
const token1 = this.token.getToken();
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token1
  })
}
return this.http.get(
  this.AUTH_API + 'Treedata/'+id,
  httpOptions
);
}


forgotpassword(value: {
  regid: string;
  email:string;
}) {
  const token = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    }),
  };

  return this.http.post(
    this.AUTH_API + 'Forget_password', 
   {
        regid: value.regid,
        email:value.email,
      },
    httpOptions
  );
}


private apiUrl = 'https://restcountries.com/v3.1/all?fields=name,cca2'; // ✅ specify fields
getCountries() {
  return this.http.get(this.apiUrl);
}

  private baseApiUrl = 'https://api.apiverve.com/v1/callingcode';
  private apiKey = 'f83453ba-3d3d-4ec3-a87d-664f1b51bf82';
  
  getCallingCode(countryCode: string): Observable<any> {
    const headers = new HttpHeaders({
      'x-api-key': this.apiKey,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
  
    const apiUrl = `${this.baseApiUrl}?country=${countryCode}`;
  
    return this.http.get(apiUrl, { headers });
  }

// company dashboard
withdrawUsers() {
  const token = this.token.getToken(); 
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }),
  };
    return this.http.get(this.AUTH_API + 'Withdraw_users', httpOptions);
}

dashboard() {
  const token = this.token.getToken(); 
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }),
  };
    return this.http.get(this.AUTH_API + 'Dashboard', httpOptions);
}

withdrawpaid() {
  const token = this.token.getToken(); 
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }),
  };
    return this.http.get(this.AUTH_API + 'Withdraw_Paid', httpOptions);
}



totalusers(page: number = 1) {
  const token = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }),
  };

  return this.http.get(`${this.AUTH_API}Total_users?page=${page}`, httpOptions);
}








upgradeTransfer(value: {
  regid: string;
  amount:string;
}) {
  const token = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    }),
  };

  return this.http.post(
    this.AUTH_API + 'Upgrades_Transefer', 
   {
        regid: value.regid,
        amount:value.amount,
      },
    httpOptions
  );
}


cupdateprofile(id: string, value: {
  regid: string;
  name: string;
  email: string;
  country: string;
  wallet1: string;
}) {
  const token = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }),
  };

  return this.http.put(
    `${this.AUTH_API}Userprofile_Update/${id}`,  
    {
      regid: value.regid,
      name: value.name,
      email: value.email,
      country: value.country,
      wallet1: value.wallet1
    },
    httpOptions
  );
}







totalMembers() {
  const token = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }),
  };

  return this.http.get(
    this.AUTH_API + "Total_Members",   // ✅ correct path
    httpOptions
  );
}

}





