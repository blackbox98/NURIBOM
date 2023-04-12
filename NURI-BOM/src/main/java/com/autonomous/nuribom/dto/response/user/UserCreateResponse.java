package com.autonomous.nuribom.dto.response.user;

import com.autonomous.nuribom.dto.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("UserCreateResponse")
public class UserCreateResponse extends BaseResponseBody {
    // 피보호자 식별번호
    private Long userId;

    // 담당 피보호자 식별번호
    private Long careListId;

    public static UserCreateResponse of(Integer statusCode, String message, Long userId, Long careListId) {
        UserCreateResponse response = new UserCreateResponse();
        response.setStatusCode(statusCode);
        response.setMessage(message);
        response.setUserId(userId);
        response.setCareListId(careListId);
        return response;
    }
}
