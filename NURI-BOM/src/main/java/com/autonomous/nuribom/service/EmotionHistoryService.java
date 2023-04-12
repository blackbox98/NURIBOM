package com.autonomous.nuribom.service;

import com.autonomous.nuribom.dto.request.emotionHistory.EmotionHistoryCreateRequest;
import com.autonomous.nuribom.dto.request.emotionHistory.EmotionHistoryUpdateRequest;
import com.autonomous.nuribom.dto.response.emotionHistory.EmotionHistoryResponse;

import java.util.List;

public interface EmotionHistoryService {
    // 당일 감정 기록 생성
    Long createEmotionHistory(EmotionHistoryCreateRequest request);

    // 감정 기록 조회 (당일 감정 기록)
    EmotionHistoryResponse readEmotionHistory(Long userId);

    // 감정 기록 목록 조회 (당일 포함 과거 감정 기록)
    List<EmotionHistoryResponse> readEmotionHistoryList(Long userId);

    // 당일 감정 기록 수정
    void updateEmotionHistory(String serialNo, EmotionHistoryUpdateRequest request);

    // 감정 기록 삭제
    void deleteEmotionHistory(Long emotionHistoryId);
}