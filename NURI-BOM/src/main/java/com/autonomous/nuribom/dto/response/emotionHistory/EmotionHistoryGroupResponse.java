package com.autonomous.nuribom.dto.response.emotionHistory;

import com.autonomous.nuribom.dto.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("EmotionHistoryGroupResponse")
public class EmotionHistoryGroupResponse extends BaseResponseBody {
    // 감정 기록 목록
    private List<EmotionHistoryResponse> responses;

    public static EmotionHistoryGroupResponse of(Integer statusCode, String message, List<EmotionHistoryResponse> emotionHistoryResponses) {
        EmotionHistoryGroupResponse response = new EmotionHistoryGroupResponse();
        response.setStatusCode(statusCode);
        response.setMessage(message);
        response.setResponses(emotionHistoryResponses);
        return response;
    }
}
