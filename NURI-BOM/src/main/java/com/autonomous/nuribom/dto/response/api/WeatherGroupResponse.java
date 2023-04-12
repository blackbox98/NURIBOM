package com.autonomous.nuribom.dto.response.api;

import com.autonomous.nuribom.dto.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("WeatherGroupResponse")
public class WeatherGroupResponse extends BaseResponseBody {
    // 날씨 예보 결과 목록
    private List<WeatherResponse> responses;

    public static WeatherGroupResponse of(Integer statusCode, String message, List<WeatherResponse> weatherResponses) {
        WeatherGroupResponse response = new WeatherGroupResponse();
        response.setStatusCode(statusCode);
        response.setMessage(message);
        response.setResponses(weatherResponses);
        return response;
    }
}
