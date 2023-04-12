package com.autonomous.nuribom.dto.response.notification;

import com.autonomous.nuribom.dto.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("NotificationGroupResponse")
public class NotificationGroupResponse extends BaseResponseBody {
    // 알림 목록
    private List<NotificationResponse> responses;

    public static NotificationGroupResponse of(Integer statusCode, String message, List<NotificationResponse> notificationResponses) {
        NotificationGroupResponse response = new NotificationGroupResponse();
        response.setStatusCode(statusCode);
        response.setMessage(message);
        response.setResponses(notificationResponses);
        return response;
    }
}
