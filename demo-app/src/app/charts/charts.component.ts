import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnInit } from '@angular/core';
import { Students } from '../students.services';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

// Define types for chart data
type Gender = 'Male' | 'Female' | 'Others' | 'Prefer not to say';

interface GpaRange {
  name: string;
  count: number;
}

interface GenderData {
  [key: string]: number;  // Index signature for dynamic keys
}

@Component({
  selector: 'demo-app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true
})
export class ChartsComponent implements OnInit {
  @Input() showChart: boolean = false;

  // Define the type for pie chart data
  pieChartData: { name: string; y: number }[] = [];
  // Define the type for column chart data
  columnChartData: number[] = [];

  gpaChartOptions = {
    chart: {
      type: 'pie'
    },
    title: {
      text: '<span style="font-size:16px;">GPA</span>',
      align: 'center',
      verticalAlign: 'middle',
      y: 0
    },
    tooltip: {
      pointFormat: '<span style="color:{point.color}">●</span> {series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        borderWidth: 0,
        cursor: 'pointer',
        innerSize: '60%',
        borderRadius: 0,
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b><br>{point.percentage}%'
        }
      }
    },
    series: [
      {
        name: 'GPA Range',
        type: 'pie',
        data: this.pieChartData
      }
    ]
  };

  genderChartOptions = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Genders',
      align: 'left'
    },
    xAxis: {
      title: { text: 'Gender' },
      categories: ['Male', 'Female', 'Others', 'Prefer not to say'],
      crosshair: true,
      accessibility: { description: 'Gender' }
    },
    yAxis: {
      min: 0,
      max: 30,
      title: { text: 'Number' },
      gridLineDashStyle: 'Dot'
    },
    plotOptions: {
      column: { pointPadding: 0.1, borderWidth: 0 }
    },
    credits: { enabled: false },
    series: [
      {
        name: 'Genders',
        data: this.columnChartData
      }
    ]
  };

  constructor(private studentsService: Students) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.studentsService.fetchData().pipe(
      tap(response => {
        console.log('Fetched data:', response); // Log the fetched data
        localStorage.setItem('studentsData', JSON.stringify(response));
        this.updateCharts(response);
      }),
      catchError(error => {
        console.error('Error fetching data', error);
        return of([]); // Return an empty array in case of error
      })
    ).subscribe();
  }

  updateCharts(students: any[]): void {
    console.log('Updating charts with students data:', students); // Log students data
    this.updateGpaChartData(students);
    this.updateGenderChartData(students);
  }

  updateGpaChartData(students: any[]): void {
    const ranges: GpaRange[] = [
      { name: '0-3.0', count: 0 },
      { name: '3.0-3.2', count: 0 },
      { name: '3.2-3.4', count: 0 },
      { name: '3.4-3.6', count: 0 },
      { name: '3.6-3.8', count: 0 },
      { name: '3.8-4.0', count: 0 }
    ];

    students.forEach(student => {
      const gpa = student.gpa;
      if (gpa >= 0 && gpa < 3.0) ranges[0].count++;
      else if (gpa >= 3.0 && gpa < 3.2) ranges[1].count++;
      else if (gpa >= 3.2 && gpa < 3.4) ranges[2].count++;
      else if (gpa >= 3.4 && gpa < 3.6) ranges[3].count++;
      else if (gpa >= 3.6 && gpa < 3.8) ranges[4].count++;
      else if (gpa >= 3.8 && gpa <= 4.0) ranges[5].count++;
    });

    console.log('GPA ranges data:', ranges); // Log GPA ranges data

    this.pieChartData = ranges.map(range => ({
      name: range.name,
      y: range.count
    }));

    this.gpaChartOptions.series = [{
      name: 'GPA Range',
      type: 'pie',
      data: this.pieChartData
    }];
  }

  updateGenderChartData(students: any[]): void {
    const genderCounts: GenderData = {
      Male: 0,
      Female: 0,
      Others: 0,
      'Prefer not to say': 0
    };

    students.forEach(student => {
      const gender: Gender = student.gender || 'Others'; // Default to 'Others' if no gender is specified
      if (gender in genderCounts) {
        genderCounts[gender]++;
      }
    });

    console.log('Gender data:', genderCounts); // Log gender data

    this.columnChartData = [
      genderCounts['Male'],
      genderCounts['Female'],
      genderCounts['Others'],
      genderCounts['Prefer not to say']
    ];

    this.genderChartOptions.series = [{
      name: 'Genders',
      data: this.columnChartData
    }];
  }
}
