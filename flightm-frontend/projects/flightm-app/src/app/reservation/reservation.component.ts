import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlightService } from '../services/flight.service';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent {
  @Input() vol: any;
  @Output() reservationComplete = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  reservationData = {
    nomClient: '',
    emailClient: '',
    nombrePlaces: 1,
    telephone: ''
  };

  loading = false;
  error: string | null = null;

  constructor(private flightService: FlightService) {}

  getAvailablePlaces(): number[] {
    const availablePlaces: number[] = [];
    const maxPlaces = Math.min(this.vol.placesDisponibles, 8); 
    
    for (let i = 1; i <= maxPlaces; i++) {
      availablePlaces.push(i);
    }
    
    return availablePlaces;
  }

  submitReservation() {
    if (!this.validateForm()) return;

    this.loading = true;
    this.error = null;

    this.flightService.createReservation(this.vol.id, this.reservationData).subscribe({
      next: (response) => {
        this.loading = false;
        alert(' Réservation confirmée avec succès !\nUn email de confirmation a été envoyé.');
        this.reservationComplete.emit();
        this.close.emit();
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'Erreur lors de la réservation. Veuillez réessayer.';
      }
    });
  }

  validateForm(): boolean {
    if (!this.reservationData.nomClient.trim()) {
      this.error = 'Le nom est requis';
      return false;
    }

    if (!this.reservationData.emailClient.trim()) {
      this.error = 'L\'email est requis';
      return false;
    }

    if (!this.isValidEmail(this.reservationData.emailClient)) {
      this.error = 'Format d\'email invalide';
      return false;
    }

    if (this.reservationData.nombrePlaces > this.vol.placesDisponibles) {
      this.error = `Seulement ${this.vol.placesDisponibles} place(s) disponible(s)`;
      return false;
    }

    if (this.reservationData.nombrePlaces < 1) {
      this.error = 'Nombre de places invalide';
      return false;
    }

    return true;
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  closeModal() {
    this.close.emit();
  }
}