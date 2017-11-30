import { Observable } from 'rxjs/Observable';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartPoint } from 'chart.js';
import { MoneyHistoryModel } from '../../models/money-history.model';
import { UserService } from '../../user.service';

import 'rxjs/add/operator/map';

@Component({
  selector: 'pr-money-history',
  templateUrl: './money-history.component.html',
  styleUrls: ['./money-history.component.css']
})
export class MoneyHistoryComponent implements OnInit, AfterViewInit {

  @ViewChild('chart')
  canvas: ElementRef;

  moneyChart: Chart;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.userService
    .getMoneyHistory()
    .subscribe(data => {
        this.moneyChart = new Chart(
          this.canvas.nativeElement,
          {
            type: 'line',
            data: {
              labels: data.map(mh => mh.instant.toString()),
              datasets: [{
                  label: 'Money history',
                  backgroundColor: 'rgba(54, 162, 235, 0.2)',
                  borderColor: 'rgba(54, 162, 235, 1)',
                  data: data.map(mh => mh.money),
                  cubicInterpolationMode: 'monotone'
              }]
            },
            options: {
              scales: {
                xAxes: [{
                  type: 'time'
                }]
              }
            }
          });
      });
  }
}
