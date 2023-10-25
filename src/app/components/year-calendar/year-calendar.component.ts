import { Component, NgModule } from '@angular/core';
import { FormControl,ReactiveFormsModule } from '@angular/forms';
import { Month } from 'src/app/models/month.model';
import { CalendarCreationServiceService } from 'src/app/services/calendar-creation-service.service';
@Component({
  selector: 'app-year-calendar',
  templateUrl: './year-calendar.component.html',
  styleUrls: ['./year-calendar.component.scss']
})

export class YearCalendarComponent {
 
  public months: Month[] | undefined;
  private today = new Date();
  private year: number = this.today.getUTCFullYear();
  public selectedYear : number = this.today.getUTCFullYear();
  public yearsArray = new Array();
  public weeknames = new Array("Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su", "Mo");
  constructor(public calendarCreator: CalendarCreationServiceService) {
   
   }
   ngOnInit(): void {
    this.year = this.today.getUTCFullYear();
   this.setYearData();
    for (var iyear = 2023; iyear < 2050; iyear++) {
      this.yearsArray.push(iyear);
    }
  }
   public renderSelectedYear(selyear:number){
    this.year = selyear;
     this.setYearData();
  }
  private setYearData() {
    this.months = this.calendarCreator.renderCalendar(1, 12, this.year);
  }
}
