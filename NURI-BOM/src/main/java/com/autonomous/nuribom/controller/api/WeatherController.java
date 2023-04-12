package com.autonomous.nuribom.controller.api;

import com.autonomous.nuribom.dto.request.api.WeatherRequest;
import com.autonomous.nuribom.dto.response.api.WeatherGroupResponse;
import com.autonomous.nuribom.service.api.WeatherService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.json.simple.parser.ParseException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.io.IOException;

@RestController
@RequestMapping("/weather")
@RequiredArgsConstructor
@Api(tags = {"날씨 예보 API"})
public class WeatherController {
    private final WeatherService weatherService;

    // 날씨 정보 조회
    @PostMapping
    @ApiOperation(value = "날씨 정보 조회", notes = "날씨 정보를 조회합니다.")
    public ResponseEntity<WeatherGroupResponse> getWeather(
            @Valid @RequestBody WeatherRequest request
    ) throws IOException, ParseException {
        return ResponseEntity.status(HttpStatus.OK).body(WeatherGroupResponse.of(200, "Success", weatherService.getWeather(request)));
    }
}
