package com.autonomous.nuribom.service.api;

import com.autonomous.nuribom.dto.request.api.WeatherRequest;
import com.autonomous.nuribom.dto.response.api.WeatherResponse;
import org.json.simple.parser.ParseException;

import java.io.IOException;
import java.util.List;

public interface WeatherService {
    // 날씨 정보 조회
    List<WeatherResponse> getWeather(WeatherRequest request) throws IOException, ParseException;
}
