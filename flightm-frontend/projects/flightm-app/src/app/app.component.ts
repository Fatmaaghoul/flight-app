import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlightService } from './services/flight.service';
import { CalendarComponent } from './calendar/calendar.component';
import { ReservationComponent } from './reservation/reservation.component';
import { AdminComponent } from './admin/admin.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    HttpClientModule,
    CalendarComponent,
    ReservationComponent,
    AdminComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FlightM';
  vols: any[] = [];
  loading = false;
  error: string | null = null;
  showAdmin = false;
  villeDepart = '';
  villeArrivee = '';
  dateDepart?: string;
  dateArrivee?: string;
  tri = 'prix';
  showCalendar: string | null = null;
  
  showReservationModal = false;
  selectedVol: any = null;

  constructor(private flightService: FlightService) {}

  onDateDepartSelected(date: string) {
    this.dateDepart = date;
  }

  onDateArriveeSelected(date: string) {
    this.dateArrivee = date;
  }
  openAdmin() {
    this.showAdmin = true;
  }

  closeAdmin() {
    this.showAdmin = false;
  }
  searchVols() {
    this.loading = true;
    this.error = null;
    this.vols = [];

    const filters = {
      villeDepart: this.villeDepart,
      villeArrivee: this.villeArrivee,
      dateDepart: this.dateDepart,
      dateArrivee: this.dateArrivee,
      tri: this.tri
    };

    this.flightService.searchVols(filters).subscribe({
      next: (data) => {
        this.vols = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur API', err);
        this.error = 'Erreur lors de la recherche des vols';
        this.loading = false;
        this.vols = [];
      }
    });
  }

  reserveVol(vol: any) {
    this.selectedVol = vol;
    this.showReservationModal = true;
  }

  formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}min`;
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  ngOnInit() {
    this.loading = true;
    this.flightService.getAllVols().subscribe({
      next: (data) => {
        this.vols = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Impossible de charger les vols';
        this.loading = false;
      }
    });
  }

  toggleCalendar(type: string) {
    this.showCalendar = this.showCalendar === type ? null : type;
  }

  closeCalendar() {
    this.showCalendar = null;
  }

  onDateSelected(date: string, type: string) {
    if (type === 'depart') {
      this.dateDepart = date;
      this.onDateDepartSelected(date);
    } else {
      this.dateArrivee = date;
      this.onDateArriveeSelected(date);
    }
    this.closeCalendar();
  }

  onReservationComplete() {
    this.showReservationModal = false;
    this.selectedVol = null;
    this.searchVols(); 
  }

  closeReservationModal() {
    this.showReservationModal = false;
    this.selectedVol = null;
  }
}