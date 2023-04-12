package com.autonomous.nuribom.service;

import com.autonomous.nuribom.dto.request.visit.VisitCreateRequest;
import com.autonomous.nuribom.dto.request.visit.VisitUpdateRequest;
import com.autonomous.nuribom.dto.response.visit.VisitResponse;

import java.util.List;

public interface VisitService {
    // 방문 일정 등록
    Long createVisit(Long workerId, VisitCreateRequest request);

    // 방문 일정 상세 조회
    VisitResponse readVisit(Long visitId);

    // 방문 일정 목록 조회
    List<VisitResponse> readVisitList(Long userId);

    // 방문 일정 수정
    void updateVisit(Long visitId, VisitUpdateRequest request);

    // 방문 여부 변경
    Long visitUser(Long visitId);

    // 방문 일정 삭제
    void deleteVisit(Long visitId);
}
