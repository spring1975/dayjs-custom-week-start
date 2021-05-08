import { Component } from '@angular/core';
import dayjs from 'dayjs';
import { map } from 'rxjs/operators';
import { WeekDay } from '@angular/common';
import { WeekdayService } from './weekdays.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  readonly WeekDay = WeekDay;
  readonly weekdayAsArray = Object.values(WeekDay).slice(0, 7)
  today = dayjs().toDate();

  constructor(readonly wds: WeekdayService) {}

  weekDays$ = this.wds.nextWeekStartDate.pipe(
    map((s) => this.wds.weekDatesOf(dayjs(s)))
  );

  changeConfig(dayOfWeek: number) {
    this.wds.setWeekStartDate(dayOfWeek);
  }
}
