import { Component, OnInit, Output, EventEmitter } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlightService } from '../services/flight.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  @Output() close = new EventEmitter<void>(); 
  
  reservations: any[] = [];
  auditLogs: any[] = [];
  vols: any[] = [];
  loading = false;
  
  
  activeTab: 'reservations' | 'audit' | 'addVol'|'vols' = 'reservations';
  
  newVol = {
    villeDepart: '',
    villeArrivee: '',
    dateDepart: '',
    dateArrivee: '',
    prix: 0,
    tempsTrajet: 0,
    capacite: 0,
    placesDisponibles: 0
  };

  constructor(private flightService: FlightService) {}

  ngOnInit() {
    this.loadReservations();
  }

  closeAdmin() {
    this.close.emit(); 
  }

  addVol() {
    if (!this.validateVolForm()) return;

    this.loading = true;
    
    const volData = {
      ...this.newVol,
      dateDepart: this.newVol.dateDepart ? new Date(this.newVol.dateDepart).toISOString() : '',
      dateArrivee: this.newVol.dateArrivee ? new Date(this.newVol.dateArrivee).toISOString() : ''
    };

    this.flightService.addVol(volData).subscribe({
      next: (response) => {
        this.loading = false;
        alert(' Vol ajouté avec succès !');
        this.resetVolForm();
      },
      error: (err) => {
        this.loading = false;
        alert(' Erreur lors de l\'ajout du vol: ' + (err.message || 'Veuillez réessayer'));
      }
    });
  }

  validateVolForm(): boolean {
    if (!this.newVol.villeDepart.trim()) {
      alert('La ville de départ est requise');
      return false;
    }
    if (!this.newVol.villeArrivee.trim()) {
      alert('La ville d\'arrivée est requise');
      return false;
    }
    if (this.newVol.prix <= 0) {
      alert('Le prix doit être supérieur à 0');
      return false;
    }
    if (this.newVol.tempsTrajet <= 0) {
      alert('Le temps de trajet doit être supérieur à 0');
      return false;
    }
    if (this.newVol.capacite <= 0) {
      alert('La capacité doit être supérieure à 0');
      return false;
    }
    if (this.newVol.placesDisponibles > this.newVol.capacite) {
      alert('Les places disponibles ne peuvent pas dépasser la capacité');
      return false;
    }
    return true;
  }

  resetVolForm() {
    this.newVol = {
      villeDepart: '',
      villeArrivee: '',
      dateDepart: '',
      dateArrivee: '',
      prix: 0,
      tempsTrajet: 0,
      capacite: 0,
      placesDisponibles: 0
    };
  }

  loadReservations() {
    this.loading = true;
    this.activeTab = 'reservations';
    
    this.flightService.getAllReservations().subscribe({
      next: (data) => {
        this.reservations = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur:', err);
        this.loading = false;
      }
    });
  }

  loadAuditLogs() {
    this.loading = true;
    this.activeTab = 'audit';
    
    this.flightService.getAuditLogs().subscribe({
      next: (data) => {
        this.auditLogs = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur:', err);
        this.loading = false;
      }
    });
  }

  cancelReservation(id: string) {
    if (confirm('Êtes-vous sûr de vouloir annuler cette réservation ?')) {
      this.flightService.cancelReservation(id).subscribe({
        next: () => {
          alert('Réservation annulée avec succès');
          this.loadReservations();
        },
        error: (err) => {
          alert('Erreur lors de l\'annulation: ' + err.message);
        }
      });
    }
  }
  formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h${mins.toString().padStart(2, '0')}`;
  }
  
  loadVols() {
    this.loading = true;
    this.activeTab = 'vols'; 
    
    this.flightService.getAllVols().subscribe({
      next: (data) => {
        this.vols = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur:', err);
        this.loading = false;
      }
    });
  }
  deleteVol(id: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce vol ? Cette action est irréversible.')) {
      this.flightService.deleteVol(id).subscribe({
        next: () => {
          alert('Vol supprimé avec succès');
          this.loadVols(); 
        },
        error: (err) => {
          alert('Erreur lors de la suppression: ' + err.message);
        }
      });
    }
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}