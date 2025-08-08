import { Component } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-team-right',
  templateUrl: './team-right.component.html',
  styleUrls: ['./team-right.component.scss']
})
export class TeamRightComponent {
data1:any;
  filteredData: any[] = [];  // Data after filter
  selectedFilter: string = '';
  constructor(private api:UserService){}

  ngOnInit(){
    this.api.getrightTeam().subscribe((res:any)=>{
      console.log(res);
       this.data1 = res.data || [];
      this.filteredData = [...this.data1]; 
    })
  }

    filterTeam(): void {
    if (this.selectedFilter === '') {
      this.filteredData = [...this.data1];
    } else {
      this.filteredData = this.data1.filter((item:any) => item.board === this.selectedFilter);
    }
  }

}
