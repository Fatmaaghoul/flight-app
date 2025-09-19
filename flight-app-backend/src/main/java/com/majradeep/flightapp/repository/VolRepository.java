package com.majradeep.flightapp.repository;

import com.majradeep.flightapp.model.Vol;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import jakarta.persistence.LockModeType;
import java.util.Optional;
import java.util.UUID;

public interface VolRepository extends JpaRepository<Vol, UUID> {

   
@Lock(LockModeType.PESSIMISTIC_WRITE)
@Query("SELECT v FROM Vol v WHERE v.id = :id")
Optional<Vol> findByIdForUpdate(@Param("id") UUID id);

}