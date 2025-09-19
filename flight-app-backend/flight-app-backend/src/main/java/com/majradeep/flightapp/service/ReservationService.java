package com.majradeep.flightapp.service;

import com.majradeep.flightapp.dto.ReservationRequest;
import com.majradeep.flightapp.dto.ReservationResponse;
import com.majradeep.flightapp.model.AuditReservation;
import com.majradeep.flightapp.model.Reservation;
import com.majradeep.flightapp.model.Vol;
import com.majradeep.flightapp.repository.AuditReservationRepository;
import com.majradeep.flightapp.repository.ReservationRepository;
import com.majradeep.flightapp.repository.VolRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ReservationService {

    private static final Logger log = LoggerFactory.getLogger(ReservationService.class);

    private final ReservationRepository reservationRepository;
    private final VolRepository volRepository;
    private final AuditReservationRepository auditRepository;

    public ReservationService(ReservationRepository reservationRepository, 
                              VolRepository volRepository,
                              AuditReservationRepository auditRepository) {
        this.reservationRepository = reservationRepository;
        this.volRepository = volRepository;
        this.auditRepository = auditRepository;
    }

    
    public List<ReservationResponse> getAllReservations() {
        return reservationRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

   
    public ReservationResponse getReservationById(UUID id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Réservation introuvable avec l'ID : " + id));
        return mapToResponse(reservation);
    }

   
    @Transactional
    public ReservationResponse createReservation(UUID volId, ReservationRequest request) {
        int placesDemandees = request.getNombrePlaces() == null ? 0 : request.getNombrePlaces();
        if (placesDemandees <= 0) {
            logAudit(volId, request.getEmailClient(), placesDemandees, null, "FAILED", "Nombre de places invalide");
            throw new RuntimeException("Le nombre de places doit être >= 1");
        }

        Vol vol = volRepository.findByIdForUpdate(volId)
                .orElseThrow(() -> {
                    logAudit(volId, request.getEmailClient(), placesDemandees, null, "FAILED", "Vol introuvable");
                    return new RuntimeException("Vol introuvable avec l'ID : " + volId);
                });

        int placesAvant = vol.getPlacesDisponibles();
        if (placesAvant < placesDemandees) {
            logAudit(volId, request.getEmailClient(), placesDemandees, placesAvant, "FAILED", "Pas assez de places disponibles");
            throw new RuntimeException("Pas assez de places disponibles");
        }

       
        Reservation reservation = Reservation.builder()
                .nomClient(request.getNomClient())
                .emailClient(request.getEmailClient())
                .nombrePlaces(placesDemandees)
                .vol(vol)
                .build();

        vol.setPlacesDisponibles(placesAvant - placesDemandees);
        volRepository.save(vol);
        reservationRepository.save(reservation);

        logAudit(volId, request.getEmailClient(), placesDemandees, placesAvant, "SUCCESS", null);
        log.info("Réservation créée : {} places pour {} (vol={})", placesDemandees, request.getNomClient(), volId);

        return mapToResponse(reservation);
    }

    
    @Transactional
    public void cancelReservation(UUID id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Réservation introuvable avec l'ID : " + id));

        Vol vol = reservation.getVol();
        int placesAvant = vol.getPlacesDisponibles();
        int placesRestituees = reservation.getNombrePlaces();

        vol.setPlacesDisponibles(placesAvant + placesRestituees);
        volRepository.save(vol);
        reservationRepository.deleteById(id);

        logAudit(vol.getId(), reservation.getEmailClient(), placesRestituees, placesAvant, "SUCCESS", "Annulation");
        log.info("Réservation annulée : {} places restituées (vol={})", reservation.getNombrePlaces(), vol.getId());
    }


    private ReservationResponse mapToResponse(Reservation reservation) {
        return ReservationResponse.builder()
                .id(reservation.getId())
                .nomClient(reservation.getNomClient())
                .emailClient(reservation.getEmailClient())
                .volId(reservation.getVol().getId())
                .nombrePlaces(reservation.getNombrePlaces())
                .build();
    }

   
    private void logAudit(UUID volId, String email, Integer placesDemandees, Integer placesDisponiblesAvant,
                          String statut, String messageErreur) {
        AuditReservation audit = AuditReservation.builder()
                .timestamp(LocalDateTime.now())
                .volId(volId)
                .emailPassager(email)
                .placesDemandees(placesDemandees)
                .placesDisponiblesAvant(placesDisponiblesAvant)
                .statut(statut)
                .messageErreur(messageErreur)
                .build();
        auditRepository.save(audit);
    }
}
