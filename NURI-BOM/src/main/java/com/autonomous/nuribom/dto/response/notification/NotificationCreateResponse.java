package com.autonomous.nuribom.dto.response.notification;

import com.autonomous.nuribom.dto.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("NotificationCreateResponse")
public class NotificationCreateResponse extends BaseResponseBody {
    // 알림 식별번호
    private Long id;

    public static NotificationCreateResponse of(Integer statusCode, String message, Long notificationId) {
        NotificationCreateResponse response = new NotificationCreateResponse();
        response.setStatusCode(statusCode);
        response.setMessage(message);
        response.setId(notificationId);
        return response;
    }
}
