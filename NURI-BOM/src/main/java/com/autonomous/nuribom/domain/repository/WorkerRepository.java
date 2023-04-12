package com.autonomous.nuribom.domain.repository;

import com.autonomous.nuribom.domain.entity.CareList;
import com.autonomous.nuribom.domain.entity.Worker;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface WorkerRepository extends JpaRepository<Worker, Long> {
    Optional<Worker> findByWorkerWebId(String workerWebId);

    Optional<Worker> findByWorkerNameAndWorkerPhone(String workerName, String workerPhone);

    Optional<Worker> findByWorkerWebIdAndWorkerNameAndWorkerPhone(String workerWebId, String workerName, String workerPhone);

    Optional<Worker> findByCareListsContains(CareList careList);
}
