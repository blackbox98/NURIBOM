package com.autonomous.nuribom.service;

import com.autonomous.nuribom.common.exception.NotFoundException;
import com.autonomous.nuribom.domain.entity.CareList;
import com.autonomous.nuribom.domain.entity.Notification;
import com.autonomous.nuribom.domain.entity.User;
import com.autonomous.nuribom.domain.entity.Worker;
import com.autonomous.nuribom.domain.repository.CareListRepository;
import com.autonomous.nuribom.domain.repository.NotificationRepository;
import com.autonomous.nuribom.domain.repository.UserRepository;
import com.autonomous.nuribom.domain.repository.WorkerRepository;
import com.autonomous.nuribom.dto.request.notification.NotificationRequest;
import com.autonomous.nuribom.dto.response.notification.NotificationResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import static com.autonomous.nuribom.common.exception.NotFoundException.*;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class NotificationServiceImpl implements NotificationService {
    private final WorkerRepository workerRepository;
    private final UserRepository userRepository;
    private final CareListRepository careListRepository;
    private final NotificationRepository notificationRepository;

    // 알림 등록
    @Override
    @Transactional
    public Long createNotification(String serialNo, NotificationRequest request) {
        User user = userRepository.findBySerialNo(serialNo)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        CareList careList = careListRepository.findByUser(user)
                .orElseThrow(() -> new NotFoundException(CARELIST_NOT_FOUND));
        Worker worker = workerRepository.findByCareListsContains(careList)
                .orElseThrow(() -> new NotFoundException(WORKER_NOT_FOUND));
        Notification notification;
        if (Objects.equals(request.getNotificationType(), "FIRST_MOVE")) {
            notification = Notification.createNotification()
                    .worker(worker)
                    .user(user)
                    .contents(String.format("%s님께서 오늘 처음 활동하셨습니다.", user.getUserName()))
                    .build();
        } else {
            notification = Notification.createNotification()
                    .worker(worker)
                    .user(user)
                    .contents(String.format("%s님에게 낙상 사고가 발생하였습니다! 확인이 필요합니다!", user.getUserName()))
                    .build();
        }
        return notificationRepository.save(notification).getId();
    }

    // 알림 목록 조회 (보호자)
    @Override
    public List<NotificationResponse> readListByWorker(Long workerId) {
        Worker worker = workerRepository.findById(workerId)
                .orElseThrow(() -> new NotFoundException(WORKER_NOT_FOUND));
        return notificationRepository.findByWorker(worker).stream()
                .map(NotificationResponse::response)
                .collect(Collectors.toList());
    }

    // 알림 목록 조회 (피보호자)
    @Override
    public List<NotificationResponse> readListByUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        return notificationRepository.findByUser(user).stream()
                .map(NotificationResponse::response)
                .collect(Collectors.toList());
    }

    // 알림 읽기 여부 변경
    @Override
    @Transactional
    public void readNotification(Long notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new NotFoundException(NOTIFICATION_NOT_FOUND));
        notification.readNotification();
        notificationRepository.save(notification);
    }

    // 알림 삭제
    @Override
    @Transactional
    public void delete(Long notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new NotFoundException(NOTIFICATION_NOT_FOUND));
        notificationRepository.delete(notification);
    }
}
