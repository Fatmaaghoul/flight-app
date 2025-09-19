package com.majradeep.flightapp.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuditReservation {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private LocalDateTime timestamp;
    private UUID volId;
    private String emailPassager;
    private Integer placesDemandees;
    private Integer placesDisponiblesAvant;

    private String statut; 
    private String messageErreur;
}
