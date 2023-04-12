package com.autonomous.nuribom.dto.response.visit;

import com.autonomous.nuribom.dto.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("VisitCreateResponse")
public class VisitCreateResponse extends BaseResponseBody {
    // 방문일정 식별번호
    private Long id;

    public static VisitCreateResponse of(Integer statusCode, String message, Long visitId) {
        VisitCreateResponse response = new VisitCreateResponse();
        response.setStatusCode(statusCode);
        response.setMessage(message);
        response.setId(visitId);
        return response;
    }
}