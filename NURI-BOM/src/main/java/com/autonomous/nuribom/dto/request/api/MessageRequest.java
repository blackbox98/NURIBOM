package com.autonomous.nuribom.dto.request.api;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class MessageRequest {
    // 수신번호 : '-'를 제외한 숫자만 입력 가능
    private String to;

    // 개별 메시지 내용 - SMS: 최대 80byte, LMS, MMS: 최대 2000byte
    private String content;
}
