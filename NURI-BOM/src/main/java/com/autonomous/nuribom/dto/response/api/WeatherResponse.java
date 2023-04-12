package com.autonomous.nuribom.dto.response.api;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("WeatherResponse")
public class WeatherResponse {
    // 자료구분코드
    private String category;

    // 예보값 : Category(자료구분)에 대한 예측값
    private String fcstValue;

    public static WeatherResponse response(
            String category,
            String fcstValue
    ) {
        return new WeatherResponse(
                category,
                fcstValue
        );
    }
}
