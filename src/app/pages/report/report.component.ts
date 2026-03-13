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
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 182, 0, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
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

  change(type: string){
    switch(type){
      case 'line' :
        this.type = 'line';
        break;
      case 'bar' :
        this.type = 'bar';
        break;
      case 'doughnut' :
        this.type = 'doughnut';
        break;
      case 'radar':
        this.type = 'radar';
        break;
      case 'pie' :
        this.type = 'pie';
        break;
    }

    if(this.chart != null){
      this.chart.destroy();
    }
    this.draw();
  }

}
