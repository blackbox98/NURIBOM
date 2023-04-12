package com.autonomous.nuribom.domain.repository;

import com.autonomous.nuribom.domain.entity.CareList;
import com.autonomous.nuribom.domain.entity.User;
import com.autonomous.nuribom.domain.entity.Worker;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CareListRepository extends JpaRepository<CareList, Long> {
    List<CareList> findByWorker(Worker worker);

    Optional<CareList> findByUser(User user);

    Optional<CareList> findByWorkerAndUser(Worker worker, User user);
}
