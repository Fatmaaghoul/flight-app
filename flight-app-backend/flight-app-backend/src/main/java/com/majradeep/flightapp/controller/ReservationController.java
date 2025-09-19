package com.majradeep.flightapp.controller;

import com.majradeep.flightapp.dto.ReservationRequest;
import com.majradeep.flightapp.dto.ReservationResponse;
import com.majradeep.flightapp.service.ReservationService;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/reservations")
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*", allowCredentials = "true")
public class ReservationController {

    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

   
    @GetMapping
    public List<ReservationResponse> getAllReservations() {
        return reservationService.getAllReservations();
    }

    
    @GetMapping("/{id}")
    public ReservationResponse getReservationById(@PathVariable UUID id) {
        return reservationService.getReservationById(id);
    }

   
    @PostMapping("/{volId}")
    public ReservationResponse createReservation(
            @PathVariable UUID volId,
            @RequestBody @Valid ReservationRequest request) {
        return reservationService.createReservation(volId, request);
    }

    @DeleteMapping("/{id}")
    public void cancelReservation(@PathVariable UUID id) {
        reservationService.cancelReservation(id);
    }
}
