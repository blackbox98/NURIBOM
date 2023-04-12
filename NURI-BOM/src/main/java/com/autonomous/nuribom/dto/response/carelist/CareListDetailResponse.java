package com.autonomous.nuribom.dto.response.carelist;

import com.autonomous.nuribom.dto.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("CareListDetailResponse")
public class CareListDetailResponse extends BaseResponseBody {
    // 담당 보호자 리스트 식별번호
    private Long id;

    // 보호자 ID
    private Long workerId;

    // 보호자 이름
    private String workerName;

    // 피보호자 ID
    private Long userId;

    // 피보호자 이름
    private String userName;

    public static CareListDetailResponse of(Integer statusCode, String message, CareListResponse careListResponse) {
        CareListDetailResponse response = new CareListDetailResponse();
        response.setStatusCode(statusCode);
        response.setMessage(message);
        response.setId(careListResponse.getId());
        response.setWorkerId(careListResponse.getWorkerId());
        response.setWorkerName(careListResponse.getWorkerName());
        response.setUserId(careListResponse.getUserId());
        response.setUserName(careListResponse.getUserName());
        return response;
    }
}