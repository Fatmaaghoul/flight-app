import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  searchVols(filters: any): Observable<any[]> {
    let params = new HttpParams();
    
    if (filters.villeDepart) params = params.set('villeDepart', filters.villeDepart);
    if (filters.villeArrivee) params = params.set('villeArrivee', filters.villeArrivee);
    
    if (filters.dateDepart) {
      const dateTimeDepart = filters.dateDepart + 'T00:00:00';
      params = params.set('dateDepart', dateTimeDepart);
    }
    
    if (filters.dateArrivee) {
      const dateTimeArrivee = filters.dateArrivee + 'T00:00:00';
      params = params.set('dateArrivee', dateTimeArrivee);
    }
    
    if (filters.tri) params = params.set('tri', filters.tri);

    console.log('Recherche vols avec params:', params.toString());

    return this.http.get<any[]>(`${this.apiUrl}/vols`, { params }).pipe(
      tap(response => console.log(' Réponse reçue:', response)),
      tap(response => console.log(` Nombre de vols: ${response?.length || 0}`)),
      catchError(error => {
        console.error(' Erreur recherche vols:', error);
        return throwError(() => new Error('Erreur lors de la recherche des vols'));
      })
    );
  }

  getAllVols(): Observable<any[]> {
    console.log(' Récupération de tous les vols');
    return this.http.get<any[]>(`${this.apiUrl}/vols`).pipe(
      tap(response => console.log(' Tous les vols:', response)),
      catchError(error => {
        console.error(' Erreur tous les vols:', error);
        return throwError(() => new Error('Erreur lors de la récupération des vols'));
      })
    );
  }

  getVolById(id: string): Observable<any> {
    console.log(` Récupération du vol ID: ${id}`);
    return this.http.get<any>(`${this.apiUrl}/vols/${id}`).pipe(
      tap(response => console.log(' Vol trouvé:', response)),
      catchError(error => {
        console.error(` Erreur vol ${id}:`, error);
        return throwError(() => new Error('Erreur lors de la récupération du vol'));
      })
    );
  }

  addVol(vol: any): Observable<any> {
    console.log(' Ajout d\'un nouveau vol:', vol);
    return this.http.post<any>(`${this.apiUrl}/vols`, vol).pipe(
      tap(response => console.log(' Vol ajouté:', response)),
      catchError(error => {
        console.error('Erreur ajout vol:', error);
        return throwError(() => new Error('Erreur lors de l\'ajout du vol'));
      })
    );
  }

  deleteVol(id: string): Observable<void> {
    console.log(` Suppression du vol ID: ${id}`);
    return this.http.delete<void>(`${this.apiUrl}/vols/${id}`).pipe(
      tap(() => console.log(' Vol supprimé')),
      catchError(error => {
        console.error(` Erreur suppression vol ${id}:`, error);
        return throwError(() => new Error('Erreur lors de la suppression du vol'));
      })
    );
  }

  
  createReservation(volId: string, reservationData: any): Observable<any> {
    console.log(' Création réservation pour vol', volId, reservationData);
    return this.http.post<any>(`${this.apiUrl}/reservations/${volId}`, reservationData).pipe(
      tap(response => console.log(' Réservation créée:', response)),
      catchError(error => {
        console.error(' Erreur création réservation:', error);
        return throwError(() => new Error(error.error?.message || 'Erreur lors de la création de la réservation'));
      })
    );
  }

 
  getAllReservations(): Observable<any[]> {
    console.log(' Récupération de toutes les réservations');
    return this.http.get<any[]>(`${this.apiUrl}/reservations`).pipe(
      tap(response => console.log(' Réservations:', response)),
      catchError(error => {
        console.error(' Erreur réservations:', error);
        return throwError(() => new Error('Erreur lors de la récupération des réservations'));
      })
    );
  }

 
  cancelReservation(id: string): Observable<void> {
    console.log(` Annulation réservation ID: ${id}`);
    return this.http.delete<void>(`${this.apiUrl}/reservations/${id}`).pipe(
      tap(() => console.log(' Réservation annulée')),
      catchError(error => {
        console.error(` Erreur annulation réservation ${id}:`, error);
        return throwError(() => new Error('Erreur lors de l\'annulation de la réservation'));
      })
    );
  }

 
  getAuditLogs(): Observable<any[]> {
    console.log(' Récupération des logs d\'audit');
    return this.http.get<any[]>(`${this.apiUrl}/audits`).pipe(
      tap(response => console.log(' Logs d\'audit:', response)),
      catchError(error => {
        console.error(' Erreur logs audit:', error);
        return throwError(() => new Error('Erreur lors de la récupération des logs d\'audit'));
      })
    );
  }
}