package com.autonomous.nuribom.dto.response.worker;

import com.autonomous.nuribom.dto.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("WorkerCreateResponse")
public class WorkerCreateResponse extends BaseResponseBody {
    // 보호자 식별번호
    private Long id;

    public static WorkerCreateResponse of(Integer statusCode, String message, Long workerId) {
        WorkerCreateResponse response = new WorkerCreateResponse();
        response.setStatusCode(statusCode);
        response.setMessage(message);
        response.setId(workerId);
        return response;
    }
}
