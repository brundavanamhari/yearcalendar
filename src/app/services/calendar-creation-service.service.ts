import { Injectable } from '@angular/core';
import { Month } from '../models/month.model';
import { idate } from '../models/idate.model';

@Injectable({
  providedIn: 'root'
})
export class CalendarCreationServiceService {

  public jdtbln = new Array(0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334);
  public jdtbll = new Array(0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335);
  public mtbl = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
  public mnames = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
  public leap = false;
  public jdtbl = this.jdtbln;
  public yearpattern = /^\d{4,5}$/;
  public displayStyle = "std";
  public abtlinkhidden = true;
  constructor() { }
  private monthsData = new Array();
  private isLeap(year: number) {
    return (year % 100 != 0) && (year % 4 == 0) || (year % 400 == 0);
  }
  private julianDay(day: number, month: number) {
    return day + this.jdtbl[month - 1];
  }
  private dayOfWeek(day: number, month: number, year: number) {
    this.leap = this.isLeap(year);
    this.jdtbl = this.leap ? this.jdtbll : this.jdtbln;
    var dow = (year + this.julianDay(day, month)
      + Math.floor((year - 1) / 4) - Math.floor((year - 1) / 100)
      + Math.floor((year - 1) / 400)) % 7;
    return dow == 0 ? 7 : dow;
  }

  private getMonthDateCells(month: number, year: number) {
    var dateCells = new Array(37);
    for (var ic = 0; ic < dateCells.length; ic++) {
      var datacell = new idate();
      datacell.idatename = "";
      dateCells[ic] = datacell;
    }
    var cellid = this.dayOfWeek(1, month, year) - 1;
    var max = this.mtbl[month - 1];
    if (max == 28 && this.leap) max = 29;
    var datacell = new idate();
    datacell.idatename = (1) + "";
    var datestring = year + "-" + month + "-" + 1;
    datacell.isWeekEnd = this.isWeekend(datestring);
    datacell.stringDate = datestring;
    dateCells[cellid++] = datacell;
    for (var ix = 2; ix <= max; ix++) {
      var datacell = new idate();
      datacell.idatename = (ix) + "";
      var datestring = year + "-" + month + "-" + ix;
      datacell.isWeekEnd = this.isWeekend(datestring);
      datacell.stringDate = datestring;
      dateCells[cellid++] = datacell;
    }
    var monthdata = new Month();
    monthdata.year = year;
    monthdata.monthname = this.mnames[month - 1];
    monthdata.datesarray = dateCells;
    return monthdata;
  }
  private isWeekend(strdate: string) {
    var date = new Date(strdate);
    return date.getDay() === 6 || date.getDay() === 0;
  }
  public renderCalendar(startMonth:number, stopMonth:number, year:number) {
    var seqargs = 0;
    // var monthHtml = $("span#m0").html();
    var monthseq = this.getMonthSequence(seqargs);
    var months = new Array();
    for (var ix = startMonth - 1; ix < stopMonth; ix++) {
      var monthdata = new Month();
      monthdata = this.getMonthDateCells(monthseq[ix] + 1, year)
      months.push(monthdata);
    }
    return months;
  }
  private getMonthSequence(mainMonth:number) {
    var tmp = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
    if (mainMonth == 0) return tmp;

    var monthseq = new Array();
    monthseq.push(mainMonth);
    if (mainMonth == 11) {
      // n+1 isn't possible
      monthseq.push(9);
      monthseq.push(10);
      tmp.splice(9, 3);
    } else {
      monthseq.push(mainMonth - 1);
      monthseq.push(mainMonth + 1);
      tmp.splice(mainMonth - 1, 3);
    }
    return monthseq.concat(tmp);
  }
}
