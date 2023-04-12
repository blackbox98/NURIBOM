package com.autonomous.nuribom.domain.repository;

import com.autonomous.nuribom.domain.entity.Medication;
import com.autonomous.nuribom.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MedicationRepository extends JpaRepository<Medication, Long> {
    List<Medication> findByUser(User user);
}
