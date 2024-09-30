import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, ElementRef, Renderer2 } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { Students } from '../students.services';
import { DialogComponent } from '../dialog/dialog.component';
import { PaginationNumberFormatterParams, RowSelectedEvent, RowNode } from 'ag-grid-community';
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
  public paginationPageSize = 10;
  public paginationPageSizeSelector: number[] = [10, 20, 40];
  public paginationNumberFormatter: (params: PaginationNumberFormatterParams) => string = (params: PaginationNumberFormatterParams) => {
    return params.value.toLocaleString();
  };

  rowData: any[] = [];
  filteredRowData: any[] = [];
  selectedRowData: any = null; // Store selected row data
 
  constructor(
    private studentsService: Students, 
    private resolver: ComponentFactoryResolver, 
    private vcr: ViewContainerRef,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  @Input() set data(value: any[]) {
    this.rowData = value;
    if (this.gridApi) {
      this.gridApi.setRowData(this.rowData);
    }
  }

  @Input() set clickedData(value: any[]) {
    const hyphen = new RegExp('-');
    
    const nameElement = this.el.nativeElement.querySelector('.clicked-data-name');
    if (nameElement) {
      this.renderer.setProperty(nameElement, 'innerHTML', '');
    }

    if (value.length > 0) {
      const { name } = value[0];
      if (nameElement) {
        this.renderer.setProperty(nameElement, 'innerHTML', `Data of students:  ${name}`);
      }

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
    { field: 'phone', headerName: 'Phone', flex: 1 },
    {
      headerName: 'Actions',
      flex: 2,
      cellRenderer: (params: any) => {
        const container = document.createElement('div');
        const factory = this.resolver.resolveComponentFactory(EditComponent);
        const componentRef = this.vcr.createComponent(factory);
        componentRef.instance.studentData = params.data.id;
        container.appendChild(componentRef.location.nativeElement);
        
        const deleteButton = document.createElement('en-button');
        deleteButton.innerHTML = `<en-icon-delete></en-icon-delete>`;
        deleteButton.className = 'delete-btn';
        deleteButton.onclick = () => this.deleteStudent(params.data.id);
        container.appendChild(deleteButton);

        return container;
      },
    },
  ];

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
  
  resetData(): void {
    const storedData = JSON.parse(localStorage.getItem('studentsData') || '[]');
    this.rowData = storedData;
    this.filteredRowData = storedData;
    if (this.gridApi) {
      this.gridApi.setRowData(this.filteredRowData); 
    }
  }
  
  
  onRowSelected(event: RowSelectedEvent): void {
    if (event.node.isSelected()) {
      this.selectedRowData = event.data; 
      console.log('Selected Row Data: ', this.selectedRowData);
    }
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
