package com.autonomous.nuribom.dto.response.api;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("SmsResponse")
public class SmsResponse {
    // 요청 아이디
    private String requestId;

    // 요청 시간
    private LocalDateTime requestTime;

    // 요청 상태 코드
    // 202	Accept (요청 완료)
    // 400	Bad Request
    // 401	Unauthorized
    // 403	Forbidden
    // 404	Not Found
    // 429	Too Many Requests
    // 500	Internal Server Error
    private String statusCode;

    // 요청 상태명 : success - 성공, fail - 실패
    private String statusName;

    public static SmsResponse of(String requestId, LocalDateTime requestTime, String statusCode, String statusName) {
        SmsResponse response = new SmsResponse();
        response.setRequestId(requestId);
        response.setRequestTime(requestTime);
        response.setStatusCode(statusCode);
        response.setStatusName(statusName);
        return response;
    }
}
