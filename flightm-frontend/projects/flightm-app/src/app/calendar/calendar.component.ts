import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {
  @Output() dateSelected = new EventEmitter<string>();
  @Output() closeCalendar = new EventEmitter<void>();

  today = new Date();
  currentMonth = this.today.getMonth();
  currentYear = this.today.getFullYear();
  weeks: (Date | null)[][] = [];
  selectedDate: Date | null = null;

  ngOnInit() {
    this.generateCalendar(this.currentYear, this.currentMonth);
  }

  generateCalendar(year: number, month: number) {
    this.weeks = [];
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    let current = new Date(firstDay);
    current.setDate(current.getDate() - current.getDay());

    while (current <= lastDay || current.getDay() !== 0) {
      const week: (Date | null)[] = [];
      for (let i = 0; i < 7; i++) {
        week.push(new Date(current));
        current.setDate(current.getDate() + 1);
      }
      this.weeks.push(week);
    }
  }

  prevMonth() {
    this.currentMonth--;
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    }
    this.generateCalendar(this.currentYear, this.currentMonth);
  }

  nextMonth() {
    this.currentMonth++;
    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }
    this.generateCalendar(this.currentYear, this.currentMonth);
  }

  selectDate(day: Date) {
    if (!day) return;
    this.selectedDate = day;
    const formatted = day.toISOString().split('T')[0];
    this.dateSelected.emit(formatted);
    this.closeCalendar.emit();
  }

  isToday(day: Date): boolean {
    if (!day) return false;
    return day.toDateString() === this.today.toDateString();
  }

  isSelected(day: Date): boolean {
    if (!day || !this.selectedDate) return false;
    return day.toDateString() === this.selectedDate.toDateString();
  }
}