import { Component } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-team-left',
  templateUrl: './team-left.component.html',
  styleUrls: ['./team-left.component.scss']
})
export class TeamLeftComponent {
data1:any;
  filteredData: any[] = [];  // Data after filter
  selectedFilter: string = '';
  constructor(private api:UserService){}

  ngOnInit(){
    this.api.getleftTeam().subscribe((res:any)=>{
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
