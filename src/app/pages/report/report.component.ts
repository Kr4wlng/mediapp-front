import { Component, OnInit } from '@angular/core';
import { MaterialModule } from "../../material/material.module";
import { ConsultService } from '../../services/consult.service';
import { Chart, ChartType, scales } from 'chart.js/auto'

@Component({
  selector: 'app-report',
  imports: [MaterialModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css',
})
export class ReportComponent implements OnInit{

  chart: Chart;
  type: ChartType = 'line';

  constructor(private consultservice: ConsultService){}

  ngOnInit(): void {
    this.draw();
  }

  draw(){
    this.consultservice.callProceduresOrFunction().subscribe(data => {
      const dates = data.map( x => x.consultdate);
      const quantities = data.map( x => x.quantity );

      this.chart = new Chart('canvas', {
        type: this.type,
        data: {
          labels: dates,
          datasets: [
            {
              label: 'Quantity',
              data: quantities,
              borderColor: '#3cba9f',
              fill: false,
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            x: {
              display: true,
            },
            y: {
              display: true,
              beginAtZero: true,
            },
          },
        },
      });
    });
  };

  change(type: string){}

}
