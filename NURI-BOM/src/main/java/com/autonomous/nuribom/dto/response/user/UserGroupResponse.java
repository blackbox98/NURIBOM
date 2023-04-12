package com.autonomous.nuribom.dto.response.user;

import com.autonomous.nuribom.dto.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("UserGroupResponse")
public class UserGroupResponse extends BaseResponseBody {
    // 피보호자 목록
    private List<UserResponse> responses;

    public static UserGroupResponse of(Integer statusCode, String message, List<UserResponse> userResponses) {
        UserGroupResponse response = new UserGroupResponse();
        response.setStatusCode(statusCode);
        response.setMessage(message);
        response.setResponses(userResponses);
        return response;
    }
}
