import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'ngx-traffic-cards-header',
  styleUrls: ['./traffic-cards-header.component.scss'],
  templateUrl: './traffic-cards-header.component.html',
})
export class TrafficCardsHeaderComponent implements OnDestroy {
  private alive = true;
  options: any;
  updateoptions: any;
  @Output() periodChange = new EventEmitter<string>();

  @Input() type: string = 'Busqueda';

  types: string[] = [];
  currentTheme: string;
  private now: Date;
  private value: number ;
  private data: any[];
  constructor(private themeService: NbThemeService, public http: HttpClient) {

    this.http.get(environment.server+'/getconceptos').subscribe((res: any)=> {
      res.forEach(r => {
        this.types.push(r['concepto'])
        console.log(r)
      })
    })


    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.currentTheme = theme.name;
      });
  }



  changePeriod(period: string): void {
    this.type = period;
    this.periodChange.emit(period);
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
