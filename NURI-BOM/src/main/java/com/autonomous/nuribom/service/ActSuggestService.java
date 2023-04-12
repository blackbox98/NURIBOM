package com.autonomous.nuribom.service;

import com.autonomous.nuribom.dto.request.actsuggest.ActSuggestCreateRequest;
import com.autonomous.nuribom.dto.request.actsuggest.ActSuggestUpdateRequest;
import com.autonomous.nuribom.dto.response.actsuggest.ActSuggestResponse;

import java.util.List;

public interface ActSuggestService {
    // 활동 권유 시간 설정
    Long createActSuggest(ActSuggestCreateRequest request);

    // 활동 권유 시간 상세 조회
    ActSuggestResponse readActSuggest(Long actSuggestId);

    // 활동 권유 시간 목록 조회
    List<ActSuggestResponse> readActSuggestList(String serialNo);

    // 활동 권유 시간 수정
    void updateActSuggest(Long actSuggestId, ActSuggestUpdateRequest request);

    // 활동 권유 시간 삭제
    void deleteActSuggest(Long actSuggestId);
}
