package com.majradeep.flightapp.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class ReservationRequest {

    @NotBlank(message = "Le nom est obligatoire")
    private String nomClient;

    @Email(message = "Email invalide")
    @NotBlank(message = "L'email est obligatoire")
    private String emailClient;

    @Positive(message = "Le nombre de places doit être > 0")
    private Integer nombrePlaces;
}
