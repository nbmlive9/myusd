import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { UserService } from '../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { TreeNode } from 'primeng/api';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss']
})
export class TreeViewComponent {
@ViewChild('tableToPrint') tableToPrint!: ElementRef;

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
  ldata:any;
  rdata: any;
  allData: any;
  constructor(private uapi:UserService, private activeroute:ActivatedRoute, private router:Router, private location: Location) { 
    this.id = '';
  }

  ngOnInit(): void {
    this.activeroute.params.subscribe((params) => {
      this.id = params['regid'];
      // console.log(this.id);
      if (this.id) {
        this.uapi.getregiddata(this.id).subscribe((res: any) => {
          // console.log('Response data:', res.data);
          this.udata=res.data[0];
        });
        // jsauuasd
      }
      this.loadUserTreeData();
    });
    this.profileData();

   this.uapi.getleftTeam().subscribe((res:any) => {
    this.ldata = res.data || [];
    this.combineData();
  });

  this.uapi.getrightTeam().subscribe((res:any) => {
    this.rdata = res.data || [];
    this.combineData();
  });

  }
  
  combineData() {
  // Merge only if both arrays are ready
  this.allData = [...this.ldata, ...this.rdata];
}

  profileData(){
        this.uapi.home().subscribe((res: any) => {
      // console.log('profile',res)
        this.data1 = res.data.profiledata; // Set data1 to the first item in the array
    });
  }

//   mytree1() {
//     if (this.id) {
//       console.log('trreid',this.id)
//         this.router.navigateByUrl("/treeview/${this.id}");

     
//     } else {
//         // Handle case when registration ID is not provided
//         console.log('Please provide a registration ID');
//     }
// }
mytree1(regid: string) {
  this.router.navigateByUrl(`/treeview/${regid}`);
}



loadUserTreeData() {
  this.uapi.UserTreeView(this.id).subscribe(
      (res: any) => {
        // console.log('treeview',res);
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
    // console.log('Response data:', res.data);
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

 printTable() {
    // Fetch both left + right data before printing
    Promise.all([
      this.uapi.getleftTeam().toPromise(),
      this.uapi.getrightTeam().toPromise()
    ]).then((results: any[]) => {
      this.ldata = results[0]?.data || [];
      this.rdata = results[1]?.data || [];

      const printContents = this.generatePrintHtml();
      const popupWin = window.open('', '_blank', 'width=900,height=650');
      popupWin!.document.open();
      popupWin!.document.write(printContents);
      popupWin!.document.close();
    });
  }

  downloadPDF() {
    Promise.all([
      this.uapi.getleftTeam().toPromise(),
      this.uapi.getrightTeam().toPromise()
    ]).then((results: any[]) => {
      this.ldata = results[0]?.data || [];
      this.rdata = results[1]?.data || [];

      const doc = new jsPDF({ orientation: 'p', unit: 'pt', format: 'a4' });

      let y = 40;

      // Left team
      doc.setFontSize(14);
      doc.text('Left Team', 40, y);
      y += 20;
      this.buildPdfTable(doc, this.ldata, y);
      y += (this.ldata.length + 2) * 20;

      // Right team
      doc.setFontSize(14);
      doc.text('Right Team', 40, y);
      y += 20;
      this.buildPdfTable(doc, this.rdata, y);

      doc.save('team-report.pdf');
    });
  }

  buildPdfTable(doc: jsPDF, data: any[], startY: number) {
    if (!data.length) {
      doc.text('No records found', 40, startY);
      return;
    }

    const headers = ['S.No', 'Date', 'User Id', 'Subscription', 'Status'];
    const colWidths = [50, 100, 100, 150, 100];
    let x = 40;
    let y = startY;

    // Header
    headers.forEach((h, i) => {
      doc.text(h, x, y);
      x += colWidths[i];
    });

    y += 20;

    // Rows
    data.forEach((row, i) => {
      x = 40;
      const rowData = [
        (i + 1).toString(),
        row.cdate,
        row.forid,
        this.mapBoard(row.board),
        row.status == '1' ? 'Active' : 'Inactive'
      ];
      rowData.forEach((val, j) => {
        doc.text(val, x, y);
        x += colWidths[j];
      });
      y += 20;
    });
  }

  // 🔹 Map board values
  mapBoard(board: string): string {
    switch (board) {
      case '0': return 'Not Subscribe';
      case '1': return 'Subscribed';
      case '2': return 'Silver Upgrade';
      case '3': return 'Gold Upgrade';
      case '4': return 'Diamond Upgrade';
      default: return '';
    }
  }

  generatePrintHtml(): string {
    return `
      <html>
        <head>
          <title>Team Report</title>
          <style>
            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 30px;
            }
            th, td {
              border: 1px solid #333;
              padding: 8px;
              text-align: center;
            }
            th {
              background-color: #f8f9fa;
            }
            h3 {
              margin: 20px 0 10px;
            }
          </style>
        </head>
        <body onload="window.print();window.close()">
          <h3>Left Team</h3>
          ${this.buildTable(this.ldata)}

          <h3>Right Team</h3>
          ${this.buildTable(this.rdata)}
        </body>
      </html>
    `;
  }

  buildTable(data: any[]): string {
    if (!data.length) {
      return `<p>No records found</p>`;
    }
    return `
      <table>
        <tr>
          <th>S.No</th>
          <th>Date</th>
          <th>User Id</th>
          <th>Subscription</th>
          <th>Status</th>
        </tr>
        ${data.map((row, i) => `
          <tr>
            <td>${i + 1}</td>
            <td>${row.cdate}</td>
            <td>${row.forid}</td>
            <td>
              ${row.board == '0' ? 'Not Subscribe' :
                row.board == '1' ? 'Subscribed' :
                row.board == '2' ? 'Silver Upgrade' :
                row.board == '3' ? 'Gold Upgrade' :
                row.board == '4' ? 'Diamond Upgrade' : ''}
            </td>
            <td>
              ${row.status == '1' ? 'Active' : 'Inactive'}
            </td>
          </tr>
        `).join('')}
      </table>
    `;
  }



}