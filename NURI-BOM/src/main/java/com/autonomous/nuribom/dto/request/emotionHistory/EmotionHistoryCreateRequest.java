package com.autonomous.nuribom.dto.request.emotionHistory;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmotionHistoryCreateRequest {
    // 피보호자 셋탑박스 일련번호
    @NotNull
    private String serialNo;
}
