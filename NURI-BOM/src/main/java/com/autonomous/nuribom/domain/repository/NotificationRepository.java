package com.autonomous.nuribom.domain.repository;

import com.autonomous.nuribom.domain.entity.Notification;
import com.autonomous.nuribom.domain.entity.User;
import com.autonomous.nuribom.domain.entity.Worker;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByWorker(Worker worker);

    List<Notification> findByUser(User user);
}
