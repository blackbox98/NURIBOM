package com.autonomous.nuribom.service.api;

import com.autonomous.nuribom.dto.response.api.SmsResponse;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.UnsatisfiedDependencyException;
import org.springframework.web.client.RestClientException;

import java.net.URISyntaxException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

public interface SmsService {
    // 시그니처 생성
    String makeSignature(Long time) throws NoSuchAlgorithmException, UnsatisfiedDependencyException, InvalidKeyException;

    // 메시지 발신
    SmsResponse sendSms(String serialNo) throws JsonProcessingException, RestClientException, URISyntaxException, InvalidKeyException, NoSuchAlgorithmException, UnsatisfiedDependencyException;
}
