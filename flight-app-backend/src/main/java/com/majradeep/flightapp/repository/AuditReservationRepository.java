package com.majradeep.flightapp.repository;

import com.majradeep.flightapp.model.AuditReservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AuditReservationRepository extends JpaRepository<AuditReservation, UUID> {
}
