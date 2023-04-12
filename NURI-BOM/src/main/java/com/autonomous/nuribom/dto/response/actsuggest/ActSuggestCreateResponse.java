package com.autonomous.nuribom.dto.response.actsuggest;

import com.autonomous.nuribom.dto.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("ActSuggestCreateResponse")
public class ActSuggestCreateResponse extends BaseResponseBody {
    // 활동 권유 시간 식별번호
    private Long id;

    public static ActSuggestCreateResponse of(Integer statusCode, String message, Long actSuggestId) {
        ActSuggestCreateResponse response = new ActSuggestCreateResponse();
        response.setStatusCode(statusCode);
        response.setMessage(message);
        response.setId(actSuggestId);
        return response;
    }
}
