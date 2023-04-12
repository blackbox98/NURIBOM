package com.autonomous.nuribom.dto.request.emotionHistory;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmotionHistoryUpdateRequest {
    // 기분 좋음
    @NotNull
    private int good;

    // 기분 보통
    @NotNull
    private int normal;

    // 기분 안좋음
    @NotNull
    private int bad;
}
