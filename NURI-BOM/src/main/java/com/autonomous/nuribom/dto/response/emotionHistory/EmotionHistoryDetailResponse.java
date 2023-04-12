package com.autonomous.nuribom.dto.response.emotionHistory;

import com.autonomous.nuribom.domain.entity.type.Emotion;
import com.autonomous.nuribom.dto.response.BaseResponseBody;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("EmotionHistoryDetailResponse")
public class EmotionHistoryDetailResponse extends BaseResponseBody {
    // 감정 기록 식별번호
    private Long id;

    // 피보호자 ID
    private Long userId;

    // 피보호자 이름
    private String userName;

    // 오늘 기분
    private Emotion emotion;

    // 기분 좋음
    private int good;

    // 기분 보통
    private int normal;

    // 기분 안좋음
    private int bad;

    // 감정 기록 일자
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDateTime emotionHistoryDate;

    public static EmotionHistoryDetailResponse of(Integer statusCode, String message, EmotionHistoryResponse emotionHistoryResponse) {
        EmotionHistoryDetailResponse response = new EmotionHistoryDetailResponse();
        response.setStatusCode(statusCode);
        response.setMessage(message);
        response.setId(emotionHistoryResponse.getId());
        response.setUserId(emotionHistoryResponse.getUserId());
        response.setUserName(emotionHistoryResponse.getUserName());
        response.setEmotion(emotionHistoryResponse.getEmotion());
        response.setGood(emotionHistoryResponse.getGood());
        response.setNormal(emotionHistoryResponse.getNormal());
        response.setBad(emotionHistoryResponse.getBad());
        response.setEmotionHistoryDate(emotionHistoryResponse.getEmotionHistoryDate());
        return response;
    }
}
