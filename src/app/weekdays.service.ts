import { Injectable } from '@angular/core';
import dayjs from 'dayjs';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import updateLocale from 'dayjs/plugin/updateLocale';
import { WeekDay } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class WeekdayService {
  startingWeekday = new BehaviorSubject<number>(0);

  nextWeekStartDate = this.startingWeekday.asObservable().pipe(
    tap(n => {
      dayjs().locale('en', { weekStart: n });
    }),
    map(() =>
      dayjs()
        .startOf('week')
        .add(1, 'week')
        .toDate()
    )
  );

  setWeekStartDate(weekday: number) {
    this.startingWeekday.next(weekday);
  }

  weekDaysStartingOn(firstOfWeek: WeekDay): WeekDay[] {
    const arrWeekdays = Object.values(WeekDay) as WeekDay[];
    return [
      ...arrWeekdays.slice(firstOfWeek, 7),
      ...arrWeekdays.slice(0, firstOfWeek)
    ];
  }

  weekDatesOf(djs: dayjs.Dayjs): Date[] {
    const startOfWeek = djs.startOf('week')
    return [
      ...Array.from(Array(7).keys()).map(d => startOfWeek.add(d, 'day').toDate())
    ];
  }

  constructor() {
    dayjs.extend(updateLocale);
  }
}
