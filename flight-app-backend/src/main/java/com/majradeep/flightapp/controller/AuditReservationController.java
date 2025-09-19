package com.majradeep.flightapp.controller;

import com.majradeep.flightapp.model.AuditReservation;
import com.majradeep.flightapp.repository.AuditReservationRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/audit")
@CrossOrigin(origins = "*")
public class AuditReservationController {

    private final AuditReservationRepository auditRepository;

    public AuditReservationController(AuditReservationRepository auditRepository) {
        this.auditRepository = auditRepository;
    }

   
    @GetMapping
    public List<AuditReservation> getAllAudits() {
        return auditRepository.findAll();
    }

   
    @GetMapping("/{id}")
    public AuditReservation getAuditById(@PathVariable String id) {
        return auditRepository.findById(java.util.UUID.fromString(id))
                .orElseThrow(() -> new RuntimeException("Audit introuvable avec l'ID : " + id));
    }

    
    @DeleteMapping
    public void deleteAllAudits() {
        auditRepository.deleteAll();
    }
}
