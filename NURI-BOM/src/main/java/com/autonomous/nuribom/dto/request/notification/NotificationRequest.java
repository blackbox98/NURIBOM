package com.autonomous.nuribom.dto.request.notification;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NotificationRequest {
    // 알림 종류
    @NotNull
    private String notificationType;
}
