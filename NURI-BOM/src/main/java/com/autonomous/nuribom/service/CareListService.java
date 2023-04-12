package com.autonomous.nuribom.service;

import com.autonomous.nuribom.dto.request.carelist.CareListRequest;
import com.autonomous.nuribom.dto.response.carelist.CareListResponse;

import java.util.List;

public interface CareListService {
    // 담당 피보호자 정보 등록
    Long createCareList(Long workerId, CareListRequest request);

    // 담당 피보호자 목록 조회
    List<CareListResponse> readCareListByWorker(Long workerId);
}
