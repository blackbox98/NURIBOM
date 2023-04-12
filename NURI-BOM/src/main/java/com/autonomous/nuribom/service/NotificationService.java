package com.autonomous.nuribom.service;

import com.autonomous.nuribom.dto.request.notification.NotificationRequest;
import com.autonomous.nuribom.dto.response.notification.NotificationResponse;

import java.util.List;

public interface NotificationService {
    // 알림 등록
    Long createNotification(String serialNo, NotificationRequest request);

    // 알림 목록 조회 (보호자)
    List<NotificationResponse> readListByWorker(Long workerId);

    // 알림 목록 조회 (피보호자)
    List<NotificationResponse> readListByUser(Long userId);

    // 알림 읽기 여부 변경
    void readNotification(Long notificationId);

    // 알림 삭제
    void delete(Long notificationId);
}
