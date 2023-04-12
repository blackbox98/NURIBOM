package com.autonomous.nuribom.dto.response.actsuggest;

import com.autonomous.nuribom.domain.entity.type.Activity;
import com.autonomous.nuribom.dto.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("ActSuggestDetailResponse")
public class ActSuggestDetailResponse extends BaseResponseBody {
    // 활동 권유 시간 식별번호
    private Long id;

    // 피보호자 ID
    private Long userId;

    // 피보호자 이름
    private String userName;

    // 활동 종류
    private Activity activity;

    // 활동 시간 (시)
    private String activity_hour;

    // 활동 시간 (분)
    private String activity_minutes;

    public static ActSuggestDetailResponse of(Integer statusCode, String message, ActSuggestResponse actSuggestResponse) {
        ActSuggestDetailResponse response = new ActSuggestDetailResponse();
        response.setStatusCode(statusCode);
        response.setMessage(message);
        response.setId(actSuggestResponse.getId());
        response.setUserId(actSuggestResponse.getUserId());
        response.setUserName(actSuggestResponse.getUserName());
        response.setActivity(actSuggestResponse.getActivity());
        response.setActivity_hour(actSuggestResponse.getActivity_hour());
        response.setActivity_minutes(actSuggestResponse.getActivity_minutes());
        return response;
    }
}
