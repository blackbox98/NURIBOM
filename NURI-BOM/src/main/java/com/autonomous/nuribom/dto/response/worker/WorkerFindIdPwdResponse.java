package com.autonomous.nuribom.dto.response.worker;

import com.autonomous.nuribom.dto.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("WorkerFindIdPwdResponse")
public class WorkerFindIdPwdResponse extends BaseResponseBody {
    // 보호자의 아이디 또는 비밀번호 찾기 결과
    private String result;

    public static WorkerFindIdPwdResponse of(Integer statusCode, String message, String result) {
        WorkerFindIdPwdResponse response = new WorkerFindIdPwdResponse();
        response.setStatusCode(statusCode);
        response.setMessage(message);
        response.setResult(result);
        return response;
    }
}
