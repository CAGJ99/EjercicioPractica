import { Component, OnInit, LOCALE_ID } from '@angular/core';
import { Chart } from 'chart.js';
import { TrayServices } from '../../_Services/tray.service';
import * as _moment from 'moment';
import { FormControl } from '@angular/forms';
import { element } from 'protractor';
import { MatCardLgImage } from '@angular/material';
const moment = _moment;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ubicacionControl = new FormControl();
  selectFormControl = new FormControl();
  Lastup: any = [];
  Tray: any = [];
  public canvas: any;
  public ctx;
  public datasets: any;
  public data: any;
  public myChartData;
  public clicked = true;
  public clicked1 = false;
  public clicked2 = false;
  // chart
  dato1: any;
  dato2: any;
  dato3: any;
  // Ubicaciones
  ubicaciones: any = [];
  // chart x año
  Anual: any = [];
  anio: any;
  total: any;
// Diarios
daily: any;
error: any;
// chart mensual
respuesta: any;



  constructor(private apiService: TrayServices) { }

ngOnInit() {
  // CHART UBICACION
    this.apiService.getUbication().subscribe(datos => {
    const data = datos;
    this.ubicaciones = data.ubicaciones;

    // this.ubicaciones =datos.ubicaciones.map(datos => datos.lugar);
    // console.log(this.ubicaciones);
    // let data = datos.map(datos => ubicaciones.lugar)

    const gradientChartOptionsConfigurationWithTooltipBlue: any = {
    maintainAspectRatio: false,
    legend: {
      display: false
    },

    tooltips: {
      backgroundColor: '#f5f5f5',
      titleFontColor: '#333',
      bodyFontColor: '#666',
      bodySpacing: 4,
      xPadding: 12,
      mode: 'nearest',
      intersect: 0,
      position: 'nearest'
    },
    responsive: true,
    scales: {
      yAxes: [{
        barPercentage: 1.6,
        gridLines: {
          drawBorder: false,
          color: 'rgba(29,140,248,0.0)',
          zeroLineColor: 'transparent',
        },
        ticks: {
          suggestedMin: 60,
          suggestedMax: 125,
          padding: 20,
          fontColor: '#2380f7'
        }
      }],

      xAxes: [{
        barPercentage: 1.6,
        gridLines: {
          drawBorder: false,
          color: 'rgba(29,140,248,0.1)',
          zeroLineColor: 'transparent',
        },
        ticks: {
          padding: 20,
          fontColor: '#2380f7'
        }
      }]
    }
  };


});

    this.apiService.getChartDaily()
.subscribe(res => {
  const informacion = res.cantidad;
  const total = informacion.pop();
  this.daily = total.total;
});

// CHART MENSUAL!
    this.apiService.getChartsMontly()
.subscribe(res => {
// console.log(res);
const respuestas = res.cantidad;
const result = respuestas.filter(respuesta => respuesta._id.año = 2019);
// console.log(result);
// const Anio = result.map(res => res._id.año);
const Total = result.map(res => res.total);
const Mes = result.map(res => res._id.mes);
// console.log(res);
this.dato1 = Total;
this.dato2 = Mes;
// this.dato3 = Anio;
const gradientChartOptionsConfigurationWithTooltipGreen: any = {
  maintainAspectRatio: false,
  legend: {
    display: false
  },

  tooltips: {
    backgroundColor: '#54BAE8', // '#f5f5f5',
    titleFontColor: '#333',
    bodyFontColor: '#666',
    bodySpacing: 4,
    xPadding: 12,
    mode: 'nearest',
    intersect: 0,
    position: 'nearest'
  },
  responsive: true,
  scales: {
    yAxes: [{
      barPercentage: 1.6,
      gridLines: {
        drawBorder: false,
        color: '#2E323A',
        zeroLineColor: 'transparent',
      },
      ticks: {
        suggestedMin: 50,
        suggestedMax: 125,
        padding: 20,
        fontColor: '#9e9e9e'
      }
    }],

    xAxes: [{
      barPercentage: 1.6,
      gridLines: {
        drawBorder: false,
        color: '#2E323A',
        zeroLineColor: 'transparent',
      },
      ticks: {
        padding: 20,
        fontColor: '#9e9e9e'
      }
    }]
  }
};

this.canvas = document.getElementById('chartLineGreen');
this.ctx = this.canvas.getContext('2d');


const gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

gradientStroke.addColorStop(1, 'rgba(66,134,121,0.15)');
gradientStroke.addColorStop(0.4, 'rgba(66,134,121,0.0)'); // green colors
gradientStroke.addColorStop(0, 'rgba(66,134,121,0)'); // green colors

const data = {
  labels: this.dato2,
  datasets: [{
    label: 'Data',
    fill: true,
    backgroundColor: gradientStroke,
    borderColor: '#131098',
    borderWidth: 2,
    borderDash: [],
    borderDashOffset: 0.0,
    pointBackgroundColor: '#131098',
    pointBorderColor: 'rgba(255,255,255,0)',
    pointHoverBackgroundColor: '#00D6B4',
    pointBorderWidth: 20,
    pointHoverRadius: 4,
    pointHoverBorderWidth: 15,
    pointRadius: 4,
    data: this.dato1,
  }]
};


const myChart = new Chart(this.ctx, {
  type: 'line',
  data,
  options: gradientChartOptionsConfigurationWithTooltipGreen

});

});
// CHART AÑO



    this.apiService.getChartYearly()
      .subscribe(res => {
        this.Anual = res;
        const total = this.Anual.cantidad.map(res => res.total);
        const anio = this.Anual.cantidad.map(res => res._id.año);
        this.anio = anio;
        this.total = total;


        const gradientChartOptionsConfigurationWithTooltipRed: any = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: 'nearest',
        intersect: 0,
        position: 'nearest'
      },
      responsive: true,
      scales: {
        yAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: 'transparent',
          },
          ticks: {
            suggestedMin: 60,
            suggestedMax: 125,
            padding: 20,
            fontColor: '#9a9a9a'
          }
        }],

        xAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: '#2E323A',
            zeroLineColor: 'transparent',
          },
          ticks: {
            padding: 20,
            fontColor: '#9a9a9a'
          }
        }]
      }
    };


        this.canvas = document.getElementById('chartBig1');
        this.ctx = this.canvas.getContext('2d');

        const gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);


        gradientStroke.addColorStop(1, 'rgba(66,134,121,0.15)');
        gradientStroke.addColorStop(0.4, 'rgba(66,134,121,0.0)'); // green colors
        gradientStroke.addColorStop(0, 'rgba(66,134,121,0)'); // green colors


        const data = {
      labels: this.anio,
      datasets: [{
        label: 'Data',
        fill: true,
        backgroundColor: gradientStroke,
        borderColor: '#131098',
        borderWidth: 2,
        borderDash: [],
        borderDashOffset: 0.0,
        pointBackgroundColor: '#131098',
        pointBorderColor: 'rgba(255,255,255,0)',
        pointHoverBackgroundColor: '#131098',
        pointBorderWidth: 20,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 15,
        pointRadius: 4,
        data: this.total,
      }]
    };

        const myChart = new Chart(this.ctx, {
      type: 'line',
      data,
      options: gradientChartOptionsConfigurationWithTooltipRed
    });

  });

  }

  public updateOptions() {
    this.myChartData.data.datasets[0].data = this.data;
    this.myChartData.update();
  }

 getUbication(value: any) {
   console.log(value.total);

 }


}


/*function getAllIndexes(arr) {
  let indexes = [], i: number;
  for (i = 0; i < arr.length; i++) {
        indexes.push(i);
}
  return indexes;
}*/
