package com.autonomous.nuribom.dto.response.emotionHistory;

import com.autonomous.nuribom.dto.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("EmotionHistoryCreateResponse")
public class EmotionHistoryCreateResponse extends BaseResponseBody {
    // 감정 기록 식별번호
    private Long id;

    public static EmotionHistoryCreateResponse of(Integer statusCode, String message, Long emotionHistoryId) {
        EmotionHistoryCreateResponse response = new EmotionHistoryCreateResponse();
        response.setStatusCode(statusCode);
        response.setMessage(message);
        response.setId(emotionHistoryId);
        return response;
    }
}
