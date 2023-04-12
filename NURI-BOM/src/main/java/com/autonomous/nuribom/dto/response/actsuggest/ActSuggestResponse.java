package com.autonomous.nuribom.dto.response.actsuggest;

import com.autonomous.nuribom.domain.entity.ActSuggest;
import com.autonomous.nuribom.domain.entity.type.Activity;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("ActSuggestResponse")
public class ActSuggestResponse {
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

    public static ActSuggestResponse response(
            ActSuggest actSuggest
    ) {
        return new ActSuggestResponse(
                actSuggest.getId(),
                actSuggest.getUser().getId(),
                actSuggest.getUser().getUserName(),
                actSuggest.getActivity(),
                actSuggest.getActivity_hour(),
                actSuggest.getActivity_minutes()
        );
    }
}
