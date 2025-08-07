import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-direct-team',
  templateUrl: './direct-team.component.html',
  styleUrls: ['./direct-team.component.scss']
})
export class DirectTeamComponent implements OnInit {

  data1: any[] = [];         // Full data from API
  filteredData: any[] = [];  // Data after filter
  selectedFilter: string = '';  // For dropdown filter

  constructor(private api: UserService) {}

  ngOnInit(): void {
    this.getdata();
  }

  getdata(): void {
    this.api.DirectTeam().subscribe((res: any) => {
      console.log("directteam:", res);
      this.data1 = res.data || [];
      this.filteredData = [...this.data1]; // Show all by default
    });
  }

  filterTeam(): void {
    if (this.selectedFilter === '') {
      this.filteredData = [...this.data1];
    } else {
      this.filteredData = this.data1.filter(item => item.boardstatus === this.selectedFilter);
    }
  }
}
