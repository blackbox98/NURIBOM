package com.autonomous.nuribom.controller.api;

import com.autonomous.nuribom.dto.response.api.SmsResponse;
import com.autonomous.nuribom.service.api.SmsService;
import com.fasterxml.jackson.core.JsonProcessingException;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.UnsatisfiedDependencyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClientException;

import java.net.URISyntaxException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

@RestController
@RequestMapping("/sms")
@RequiredArgsConstructor
@Api(tags = {"알림 메시지 발송 API"})
public class SmsController {
    private final SmsService smsService;

    @PostMapping("/{serialNo}")
    @ApiOperation(value = "알림 메시지 발송", notes = "알림 메시지를 발송합니다.")
    @ApiResponses({
            @ApiResponse(code = 202, message = "Accept (요청 완료)"),
            @ApiResponse(code = 400, message = "Bad Request"),
            @ApiResponse(code = 401, message = "Unauthorized"),
            @ApiResponse(code = 403, message = "Forbidden"),
            @ApiResponse(code = 404, message = "Not Found"),
            @ApiResponse(code = 429, message = "Too Many Requests"),
            @ApiResponse(code = 500, message = "Internal Server Error")
    })
    public ResponseEntity<SmsResponse> sendSms(
            @PathVariable String serialNo
    ) throws JsonProcessingException, RestClientException, URISyntaxException, InvalidKeyException, NoSuchAlgorithmException, UnsatisfiedDependencyException {
        SmsResponse response = smsService.sendSms(serialNo);
        return ResponseEntity.status(HttpStatus.OK).body(SmsResponse.of(response.getRequestId(), response.getRequestTime(), response.getStatusCode(), response.getStatusName()));
    }
}
