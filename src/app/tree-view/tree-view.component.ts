import { Component, Input } from '@angular/core';
import { UserService } from '../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss']
})
export class TreeViewComponent {

  id: any;
  udata = { regid: '' };
  udata1:any;
  data2:any;
  data: TreeNode[] = [];
  selectedNodes: TreeNode[] = [];
  data1:any;
  errorMessage='';
  tdata:any;
  visible: boolean = false;
  repd: any;
  pdata:any;
  loading: boolean = true;
  constructor(private uapi:UserService, private activeroute:ActivatedRoute, private router:Router, private location: Location) { 
    this.id = '';
  }

  ngOnInit(): void {
    this.activeroute.params.subscribe((params) => {
      this.id = params['regid'];
      // console.log(this.id);
      if (this.id) {
        this.uapi.getregiddata(this.id).subscribe((res: any) => {
          console.log('Response data:', res.data);
          this.udata=res.data[0];
        });
        
      }
      this.loadUserTreeData();
    });
    this.profileData();
  }

  profileData(){
        this.uapi.home().subscribe((res: any) => {
      console.log('profile',res)
        this.data1 = res.data.profiledata; // Set data1 to the first item in the array
    });
  }

  mytree1() {
    if (this.data1.regid) {
      console.log('trreid',this.data1.regid)
        this.router.navigateByUrl("/treeview/${this.data1.regid}");

     
      
    } else {
        // Handle case when registration ID is not provided
        console.log('Please provide a registration ID');
    }
}



loadUserTreeData() {
  this.uapi.UserTreeView(this.id).subscribe(
      (res: any) => {
        console.log('treeview',res);
          // Success response
          this.data2 = res.data;
          if (this.data2) {
              this.buildTree();
              this.errorMessage = ''; // Reset error message if data is available
          } else {
              this.errorMessage = 'No data available for organization chart.';
          }
      },
      (error: any) => {
          // Error response
          if (error) {
              this.errorMessage = 'No Data Found - Please Enter valid userid';
          } else {
              this.errorMessage = error.error.message || 'An error occurred while fetching data.';
          }
      }
  );
}



  buildTree() {
  if (this.data2) {
    const mainId = this.data2.main?.regid || 'No User';

    this.data = [
      {
        expanded: true,
        type: 'person',
        data: {
          image: this.getImageByBoardStatus(this.data2.main.boardstatus),
          name: this.data2.main.name,
          title: mainId,
        },
        children: [
          {
            expanded: true,
            type: 'person',
            data: {
              image: this.getImageByBoardStatus(this.data2.a.boardstatus),
              name: this.data2.a.name || 'No User',
              title: this.data2.a.regid || 'No User',
              position: 'left',
              parentid: mainId
            },
            children: [
              {
                expanded: true,
                type: 'person',
                data: {
                  image: this.getImageByBoardStatus(this.data2.aleft.boardstatus),
                  name: this.data2.aleft.name || 'No User',
                  title: this.data2.aleft.regid || 'No User',
                  position: 'left',
                  parentid: this.data2.a.regid || 'No User'
                },
              },
              {
                expanded: true,
                type: 'person',
                data: {
                  image: this.getImageByBoardStatus(this.data2.aright.boardstatus),
                  name: this.data2.aright.name || 'No User',
                  title: this.data2.aright.regid || 'No User',
                  position: 'right',
                  parentid: this.data2.a.regid || 'No User'
                },
              },
            ]
          },
          {
            expanded: true,
            type: 'person',
            data: {
              image: this.getImageByBoardStatus(this.data2.b.boardstatus),
              name: this.data2.b.name || 'No User',
              title: this.data2.b.regid || 'No User',
              position: 'right',
              parentid: mainId
            },
            children: [
              {
                expanded: true,
                type: 'person',
                data: {
                  image: this.getImageByBoardStatus(this.data2.bleft.boardstatus),
                  name: this.data2.bleft.name || 'No User',
                  title: this.data2.bleft.regid || 'No User',
                  position: 'left',
                  parentid: this.data2.b.regid || 'No User'
                },
              },
              {
                expanded: true,
                type: 'person',
                data: {
                  image: this.getImageByBoardStatus(this.data2.bright.boardstatus),
                  name: this.data2.bright.name || 'No User',
                  title: this.data2.bright.regid || 'No User',
                  position: 'right',
                  parentid: this.data2.b.regid || 'No User'
                },
              },
            ]
          }
        ]
      }
    ];
  }
}


handleNodeClick(data: any) {
  if (data.name === 'No User') {
    // Only allow registration if parentid exists and is NOT "No User"
    if (data.parentid && data.parentid !== 'No User' && data.position) {
      this.router.navigate(['/treeregister', data.parentid, data.position]);
    } else {
      console.warn('Registration not allowed — parent is missing or is No User.');
    }
  } else {
    // Existing user — go to their tree view
    if (data.title && data.title !== 'No User') {
      this.router.navigateByUrl(`/treeview/${data.title}`);
    } else {
      console.warn('Invalid regid/title for existing user.');
    }
  }
}


getImageByBoardStatus(boardstatus: string): string {
  switch (boardstatus) {
    case '0':
      return 'assets/rfree'; // Path to image for Free Package
    case '1':
      return 'assets/rgreen'; // Path to image for subcried Package
    case '2':
      return 'assets/rdiamond'; // Path to image for sliver Package
    case '3':
      return 'assets/rgold'; // Path to image for gold Package
      case '4':
        return 'assets/dimaod.jpeg'; // Path to image for Diamond Package
    default:
      return 'assets/falur.jpeg'; // Default image path
  }
}

gettreeviewdata(id: string) {
  this.loading = true; 
  this.uapi.UserTreeViewDataById(id).subscribe((res: any) => {
    console.log('Response data:', res.data);
    this.tdata = res.data;
    this.loading = false; 
  });
}

showDialog(nodeData: any) {
  this.visible = true;
  this.repd = nodeData;
  this.gettreeviewdata(nodeData.title);
  
}
  
mytree(regid: string) {
  this.router.navigateByUrl(`/treeview/${regid}`);
}

goBack() {
  this.location.back();
}


}