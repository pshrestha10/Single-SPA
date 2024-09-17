import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';

interface ChartData {
  name: string;
  y: number;
  sliced: boolean;
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
}
