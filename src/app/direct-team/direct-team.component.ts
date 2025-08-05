import { Component } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-direct-team',
  templateUrl: './direct-team.component.html',
  styleUrls: ['./direct-team.component.scss']
})
export class DirectTeamComponent {
data1:any;
  constructor(private api:UserService){}

  ngOnInit(){
    this.getdata();
  }

  getdata(){
    this.api.DirectTeam().subscribe((res:any)=>{
        console.log(res);
        this.data1=res.data;
    })
  }

}
