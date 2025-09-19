package com.majradeep.flightapp.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReservationResponse {
    private UUID id;
    private String nomClient;
    private String emailClient;
    private UUID volId;
    private Integer nombrePlaces;   
}
