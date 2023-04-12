package com.autonomous.nuribom.dto.request.api;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WeatherRequest {
    // 발표 일자
    @NotNull
    private String base_date;

    // 예보지점 X 좌표
    @NotNull
    private String nx;

    // 예보지점 Y 좌표
    @NotNull
    private String ny;
}
