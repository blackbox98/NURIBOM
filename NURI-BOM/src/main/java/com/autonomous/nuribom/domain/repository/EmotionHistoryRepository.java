package com.autonomous.nuribom.domain.repository;

import com.autonomous.nuribom.domain.entity.EmotionHistory;
import com.autonomous.nuribom.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface EmotionHistoryRepository extends JpaRepository<EmotionHistory, Long> {
    Optional<EmotionHistory> findTopByUserOrderByEmotionHistoryDateDesc(User user);

    Optional<EmotionHistory> findByUserAndEmotionHistoryDateAfter(User user, LocalDateTime today);

    List<EmotionHistory> findAllByUser(User user);
}
