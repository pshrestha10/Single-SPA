import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';

@Component({
  selector: 'demo-app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone:true
})
export class ChartsComponent {
  @Input() showChart: boolean = false;

  chartOptions = {
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
}
