package com.autonomous.nuribom.dto.response.carelist;

import com.autonomous.nuribom.dto.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("CareListGroupResponse")
public class CareListGroupResponse extends BaseResponseBody {
    // 담당 보호자 목록
    private List<CareListResponse> responses;

    public static CareListGroupResponse of(Integer statusCode, String message, List<CareListResponse> careListResponses) {
        CareListGroupResponse response = new CareListGroupResponse();
        response.setStatusCode(statusCode);
        response.setMessage(message);
        response.setResponses(careListResponses);
        return response;
    }
}