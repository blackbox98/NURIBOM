package com.autonomous.nuribom.common.exception;

public class NotFoundException extends RuntimeException {
    public static final String WORKER_NOT_FOUND = "등록되지 않은 보호자입니다.";
    public static final String USER_NOT_FOUND = "등록되지 않은 피보호자입니다.";
    public static final String MEDICATION_NOT_FOUND = "등록되지 않은 복약시간입니다.";
    public static final String VISIT_NOT_FOUND = "등록되지 않은 방문 일정입니다.";
    public static final String CARELIST_NOT_FOUND = "등록되지 않은 담당 피보호자 목록입니다.";
    public static final String CAREUSER_NOT_FOUND = "담당 중인 피보호자가 아닙니다.";
    public static final String NOTIFICATION_NOT_FOUND = "등록되지 않은 알림입니다.";
    public static final String ACTSUGGEST_NOT_FOUND = "등록되지 않은 활동 권유 시간입니다.";
    public static final String EMOTIONHISTORY_NOT_FOUND = "등록되지 않은 감정 기록입니다.";

    public NotFoundException(String message) {
        super(message);
    }
}