package com.autonomous.nuribom.dto.response.notification;

import com.autonomous.nuribom.domain.entity.type.IsRead;
import com.autonomous.nuribom.dto.response.BaseResponseBody;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("NotificationDetailResponse")
public class NotificationDetailResponse extends BaseResponseBody {
    // 알림 식별번호
    private Long id;

    // 보호자 ID
    private Long workerId;

    // 보호자 이름
    private String workerName;

    // 피보호자 ID
    private Long userId;

    // 피보호자 이름
    private String userName;

    // 알림 내용
    private String contents;

    // 알림 생성 일자
    @JsonFormat(shape= JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm")
    private LocalDateTime createdAt;

    // 읽기 여부
    private IsRead isRead;

    public static NotificationDetailResponse of(Integer statusCode, String message, NotificationResponse notificationResponse) {
        NotificationDetailResponse response = new NotificationDetailResponse();
        response.setStatusCode(statusCode);
        response.setMessage(message);
        response.setId(notificationResponse.getId());
        response.setWorkerId(notificationResponse.getWorkerId());
        response.setWorkerName(notificationResponse.getWorkerName());
        response.setUserId(notificationResponse.getUserId());
        response.setUserName(notificationResponse.getUserName());
        response.setContents(notificationResponse.getContents());
        response.setCreatedAt(notificationResponse.getCreatedAt());
        response.setIsRead(notificationResponse.getIsRead());
        return response;
    }
}
