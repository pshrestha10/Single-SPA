import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';

interface ChartData {
  name: string;
  y: number;
  sliced: boolean;
}
type Gender = 'Male' | 'Female' | 'Others' | 'Prefer not to say';
interface GenderData {
  [key: string]: number;  
}

@Component({
  selector: 'demo-app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true
})
export class ChartsComponent {
  @Input() showChart: boolean = false;
  columnChartData: number[] = [];
  genderChartOptions: any;
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
    subtitle: {
      align: 'left'
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
        },
        events:{
      click: console.log("hello")
        }
      }
      
    },
    series: [
      {
        data: [] as ChartData[] // Explicitly define the type
      }
    ]
  };

  ngOnInit(): void {
    const storedData = localStorage.getItem('studentsData');
    if (storedData) {
      const students = JSON.parse(storedData);
      this.updateChartData(students);
      this.updateGenderChartData(students);
    }
  }

  updateChartData(students: any[]): void {
    const ranges = [
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

    this.gpaChartOptions.series[0].data = ranges.map(range => ({
      name: range.name,
      y: range.count,
      sliced: true
    }));
  }
  updateGenderChartData(students: any[]): void {
    const genderCounts: GenderData = {
      Male: 0,
      Female: 0,
      Others: 0,
      'Prefer not to say': 0
    };

    students.forEach(student => {
      const gender: Gender = student.gender || 'Others'; 
      if (gender in genderCounts) {
        genderCounts[gender]++;
      }
    });

    console.log('Gender data:', genderCounts); 
    this.columnChartData = [
      genderCounts['Male'],
      genderCounts['Female'],
      genderCounts['Others'],
      genderCounts['Prefer not to say']
    ];

    this.genderChartOptions= {
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
  }

}
