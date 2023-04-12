package com.autonomous.nuribom.dto.response.visit;

import com.autonomous.nuribom.dto.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("VisitGroupResponse")
public class VisitGroupResponse extends BaseResponseBody {
    // 방문일정 목록
    private List<VisitResponse> responses;

    public static VisitGroupResponse of(Integer statusCode, String message, List<VisitResponse> visitResponses) {
        VisitGroupResponse response = new VisitGroupResponse();
        response.setStatusCode(statusCode);
        response.setMessage(message);
        response.setResponses(visitResponses);
        return response;
    }
}