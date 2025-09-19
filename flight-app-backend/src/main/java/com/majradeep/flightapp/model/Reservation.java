package com.majradeep.flightapp.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String nomClient;
    private String emailClient;
    private Integer nombrePlaces;

    @ManyToOne
    @JoinColumn(name = "vol_id")
    private Vol vol;
}
