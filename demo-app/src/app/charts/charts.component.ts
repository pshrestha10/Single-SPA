import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';

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
        data: [
          { name: '0-3.0', y: 20, sliced: true },
          { name: '3.0-3.2', y: 20, sliced: true },
          { name: '3.2-3.4', y: 20, sliced: true },
          { name: '3.4-3.6', y: 20, sliced: true },
          { name: '3.6-3.8', y: 10, sliced: true },
          { name: '3.8-4.0', y: 10, sliced: true }
        ]
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
      categories: ['Male', 'Female','Others', 'Prefer not to say'],
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
        data: [10, 15, 5, 5],  
        inactiveOtherPoints: true
      }
    ]
  };
 
}
