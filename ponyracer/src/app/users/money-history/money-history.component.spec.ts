import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { MoneyHistoryComponent } from './money-history.component';
import { UserService } from '../../user.service';
import { MoneyHistoryModel } from '../../models/money-history.model';

describe('MoneyHistoryComponent', () => {

  const userService = jasmine.createSpyObj('UserService', ['getMoneyHistory']);

  beforeEach(() => TestBed.configureTestingModule({
    declarations: [MoneyHistoryComponent],
    providers: [{ provide: UserService, useValue: userService }]
  }));

  it('should display a chart', () => {
    const history = [
      { instant: '2017-08-03T10:40:00Z', money: 10000 },
      { instant: '2017-08-04T09:15:00Z', money: 9800 }
    ] as Array<MoneyHistoryModel>;
    userService.getMoneyHistory.and.returnValue(Observable.of(history));
    const fixture = TestBed.createComponent(MoneyHistoryComponent);
    fixture.detectChanges();
    fixture.detectChanges();

    expect(userService.getMoneyHistory).toHaveBeenCalled();

    const component = fixture.componentInstance;
    expect(component.moneyChart.config.type).toBe('line', 'The chart should be a line');
    expect(component.moneyChart.config.data.labels)
      .toEqual(history.map(event => event.instant), 'The chart labels should be the instants');
    expect(component.moneyChart.config.data.datasets[0].data)
      .toEqual(history.map(event => event.money), 'The chart dataset should be the money');

    const element = fixture.nativeElement;
    const canvas = element.querySelector('canvas');
    expect(component.moneyChart.canvas).toBe(canvas, 'The chart context should the canvas element');
  });
});
