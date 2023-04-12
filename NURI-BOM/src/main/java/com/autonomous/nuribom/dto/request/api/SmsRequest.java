package com.autonomous.nuribom.dto.request.api;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SmsRequest {
    // SMS 타입 - SMS, LMS, MMS (소문자 가능)
    private String type;

    // 메시지 타입 - COMM: 일반메시지, AD: 광고메시지 (default: COMM)
    private String contentType;

    // 국가번호 - SENS에서 제공하는 국가로의 발송만 가능 (default: 82)
    private String countryCode;

    // 발신번호 - 사전 등록된 발신번호만 사용 가능
    private String from;

    // 기본 메시지 내용 - SMS: 최대 80byte, LMS, MMS: 최대 2000byte
    private String content;

    // 메시지 정보 - 최대 1,000개
    private List<MessageRequest> messages;
}
