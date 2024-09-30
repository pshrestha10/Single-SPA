import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnInit, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { Students } from '../students.services';
import { DialogComponent } from '../dialog/dialog.component';
import { PaginationNumberFormatterParams } from 'ag-grid-community';
import { CommonModule } from '@angular/common';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'demo-app-table',
  standalone: true,
  imports: [AgGridModule, DialogComponent, CommonModule, EditComponent],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TableComponent implements OnInit {
  private gridApi: any;
  pagination = true;
  paginationPageSize = 10;
  paginationSizeSelector = [10, 20, 40];
  rowSelection= 'single' ;
  rowData: any[] = [];
  filteredRowData: any[] = [];

  public paginationNumberFormatter: (params: PaginationNumberFormatterParams) => string = (params: PaginationNumberFormatterParams) => {
    return params.value.toLocaleString();
  };

  @Input() set data(value: any[]) {
    this.rowData = value;
    if (this.gridApi) {
      this.gridApi.setRowData(this.rowData);
    }
  }

  @Input() set clickedData(value: any[]) {
    const hyphen = new RegExp('-');
    if (value.length > 0) {
      const { name } = value[0];
      if (name === 'Male' || name === 'Female' || name === 'Others' || name === 'Prefer not to say') {
        this.filteredRowData = this.rowData.filter(student => student.gender === name);
      } else if (hyphen.test(name)) {
        const abc = this.parseRange(name);
        this.filteredRowData = this.rowData.filter(student => student.gpa >= abc[0] && student.gpa < abc[1]);
      }
    } else {
      this.filteredRowData = this.rowData;
    }
    if (this.gridApi) {
      this.gridApi.setRowData(this.filteredRowData);
    }
  }

  columnDefs = [
    { headerName: 'S N', valueGetter: 'node.rowIndex + 1', flex: 1 },
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 2 },
    { field: 'gpa', headerName: 'GPA', flex: 1, sortable: true },
    { field: 'gender', headerName: 'Gender', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 2 },
    { field: 'phone', headerName: 'Phone', flex: 2 },
  ];

  constructor(private studentsService: Students) {}

  ngOnInit(): void {
    this.studentsService.currentStudents.subscribe(data => {
      this.rowData = data;
      this.filteredRowData = data;
      if (this.gridApi) {
        this.gridApi.setRowData(this.filteredRowData);
      }
    });
  }

  refreshData(): void {
    this.studentsService.fetchData();
  }

  deleteStudent(id: any): void {
    const currentStudents = JSON.parse(localStorage.getItem('studentsData') || '[]');
    const updatedStudents = currentStudents.filter((student: any) => student.id !== id);
    localStorage.setItem('studentsData', JSON.stringify(updatedStudents));
    this.rowData = updatedStudents;
    if (this.gridApi) {
      this.gridApi.setRowData(this.rowData);
    }
  }

  applyFilter(event: Event): void {
    const input = event.target as HTMLInputElement;
    const filterValue = input.value.trim().toLowerCase();
    this.gridApi.setQuickFilter(filterValue);
  }

  onGridReady(params: any): void {
    this.gridApi = params.api;
    this.gridApi.setRowData(this.rowData);
  }

  onSelectionChanged(): void {
    const selectedRows = this.gridApi.getSelectedRows();
    console.log('Selected Rows:', selectedRows); 
  }

  onPageSizeChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.paginationPageSize = Number(selectElement.value);
    if (this.gridApi) {
      this.gridApi.paginationSetPageSize(this.paginationPageSize);
    }
  }

  parseRange(rangeString: string): [number, number] {
    const [minString, maxString] = rangeString.split('-');
    const min = parseFloat(minString);
    const max = parseFloat(maxString);
    return [min, max];
  }
}
