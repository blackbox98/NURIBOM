package com.autonomous.nuribom.domain.repository;

import com.autonomous.nuribom.domain.entity.User;
import com.autonomous.nuribom.domain.entity.Visit;
import com.autonomous.nuribom.domain.entity.Worker;
import com.autonomous.nuribom.domain.entity.type.IsVisited;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface VisitRepository extends JpaRepository<Visit, Long> {
    List<Visit> findByWorker(Worker worker);

    List<Visit> findByUser(User user);

    Optional<Visit> findTopByIsVisitedEqualsAndVisitDateBeforeOrderByVisitDateDesc(IsVisited isVisited, LocalDateTime today);
}
