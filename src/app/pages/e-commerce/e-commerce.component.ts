import { Component } from '@angular/core';


import { EChartOption } from 'echarts';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { timingSafeEqual } from 'crypto';
@Component({
  selector: 'ngx-ecommerce',
  templateUrl: './e-commerce.component.html',
})
export class ECommerceComponent {
  conceptos: any;
  options: any;
  updateOptions: any;

  optiontotal: any;
  optiontotalOptions: any;

  private oneDay = 24 * 3600 * 1000;
  private now: Date;
  private value: number ;


  private datatotal: any[];
  private dataxtotal: any[];

  private data: any[];
  private datax: any[];
  private timer: any;
  constructor(public http: HttpClient) {

    this.http.get(environment.server+'/getconceptos').subscribe((res: any)=> {
      this.conceptos=res;
 
    })



  }


  ngOnInit(): void {
    this.datatotal = [];
    this.dataxtotal = [];
    this.http.get(environment.server+'/gettotalesdia?mes='+4).subscribe((res:any) => {
      console.log(res)
      res.forEach((r:any) => {
       
        this.datatotal.push(parseInt(r['cuenta']))  
        this.dataxtotal.push(parseInt(r['dia']))
      })
    })

    this.optiontotal = {
      xAxis: {
        type: 'category',
        data: ['mon','tue','wed']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [56,32,34],
          type: 'line',
          smooth: true
        }
      ]
    }




    //Grafico Seleccionable de conceptos
    this.data = [];
    this.options = {
      xAxis: {
        type: 'category',
        data: []
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [],
          type: 'bar'
        }
      ]
    };


  }


cambiaConcepto(evento){
  this.data=[]
  this.datax=[]
  console.log(evento)
  this.http.get(environment.server+'/getdatosdia?concepto='+evento+'&mes='+4).subscribe((res:any) => {
    res.forEach(r => {
      console.log(r['cuenta'])
      this.datax.push(parseInt(r['dia']))
      this.data.push(parseInt(r['cuenta']))
    })
    this.updateOptions = {
      xAxis: {
        type: 'category',
        data: this.datax
      },
      series: [{
        data: this.data
      }]
    }
  })
}

}
