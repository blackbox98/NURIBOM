package com.autonomous.nuribom.dto.response.actsuggest;

import com.autonomous.nuribom.dto.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("ActSuggestGroupResponse")
public class ActSuggestGroupResponse extends BaseResponseBody {
    // 활동 권유 시간 목록
    private List<ActSuggestResponse> responses;

    public static ActSuggestGroupResponse of(Integer statusCode, String message, List<ActSuggestResponse> actSuggestResponses) {
        ActSuggestGroupResponse response = new ActSuggestGroupResponse();
        response.setStatusCode(statusCode);
        response.setMessage(message);
        response.setResponses(actSuggestResponses);
        return response;
    }
}
