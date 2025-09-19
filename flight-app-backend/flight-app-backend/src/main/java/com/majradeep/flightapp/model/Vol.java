package com.majradeep.flightapp.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Vol {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @NotBlank(message = "La ville de départ est obligatoire")
    private String villeDepart;
    @NotBlank(message = "La ville d'arrivée est obligatoire")
    private String villeArrivee;
    @NotNull(message = "La date de départ est obligatoire")
    private LocalDateTime dateDepart;
    @NotNull(message = "La date d'arrivée est obligatoire")
    private LocalDateTime dateArrivee;

    @NotNull(message = "Le prix est obligatoire")
    @Positive(message = "Le prix doit être > 0")
    private Double prix;

    @NotNull(message = "Le temps de trajet est obligatoire")
    @Positive(message = "Le temps de trajet doit être > 0")
    private Integer tempsTrajet;

    @NotNull(message = "La capacité est obligatoire")
    @Positive(message = "La capacité doit être > 0")
    private Integer capacite;
    @NotNull(message = "Les places disponibles sont obligatoires")
    @Min(value = 0, message = "Les places disponibles ne peuvent pas être négatives")

    private Integer placesDisponibles;
}