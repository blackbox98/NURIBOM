package com.autonomous.nuribom.dto.response.worker;

import com.autonomous.nuribom.dto.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("WorkerGroupResponse")
public class WorkerGroupResponse extends BaseResponseBody {
    // 보호자 목록
    private List<WorkerResponse> responses;

    public static WorkerGroupResponse of(Integer statusCode, String message, List<WorkerResponse> workerResponses) {
        WorkerGroupResponse response = new WorkerGroupResponse();
        response.setStatusCode(statusCode);
        response.setMessage(message);
        response.setResponses(workerResponses);
        return response;
    }
}
