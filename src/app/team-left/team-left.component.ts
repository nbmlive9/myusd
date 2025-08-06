import { Component } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-team-left',
  templateUrl: './team-left.component.html',
  styleUrls: ['./team-left.component.scss']
})
export class TeamLeftComponent {
data1:any;
  constructor(private api:UserService){}

  ngOnInit(){
    this.api.getleftTeam().subscribe((res:any)=>{
      console.log(res);
      this.data1=res.data;
    })
  }

}
