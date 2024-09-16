import { Component } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';

@Component({
  selector: 'demo-app-table',
  standalone: true,
  imports: [AgGridModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  columnDefs = [
    { headerName: 'Serial Number', valueGetter: 'node.rowIndex + 1' },
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Name' },
    { field: 'gpa', headerName: 'GPA' },
    { field: 'email', headerName: 'Email' },
    { field: 'phone', headerName: 'Phone' },
    { field: 'actions', headerName: 'Actions' }
  ];

  rowData = [
    { id: 1, name: 'John Doe', gpa: 3.5, email: 'john@example.com', phone: '123-456-7890', actions: 'Edit/Delete' },
    { id: 2, name: 'Jane Smith', gpa: 3.8, email: 'jane@example.com', phone: '987-654-3210', actions: 'Edit/Delete' },
    { id: 3, name: 'Alice Johnson', gpa: 3.9, email: 'alice@example.com', phone: '555-666-7777', actions: 'Edit/Delete' }
  ];
}


 
