package com.autonomous.nuribom.dto.response.emotionHistory;

import com.autonomous.nuribom.domain.entity.EmotionHistory;
import com.autonomous.nuribom.domain.entity.type.Emotion;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("EmotionHistoryResponse")
public class EmotionHistoryResponse {
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

    public static EmotionHistoryResponse response(
            EmotionHistory emotionHistory
    ) {
        return new EmotionHistoryResponse(
                emotionHistory.getId(),
                emotionHistory.getUser().getId(),
                emotionHistory.getUser().getUserName(),
                emotionHistory.getEmotion(),
                emotionHistory.getGood(),
                emotionHistory.getNormal(),
                emotionHistory.getBad(),
                emotionHistory.getEmotionHistoryDate()
        );
    }
}
