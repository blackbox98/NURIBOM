package com.autonomous.nuribom.service;

import com.autonomous.nuribom.dto.request.medication.MedicationCreateRequest;
import com.autonomous.nuribom.dto.request.medication.MedicationUpdateRequest;
import com.autonomous.nuribom.dto.response.medication.MedicationResponse;

import java.util.List;

public interface MedicationService {
    // 복약 시간 설정
    Long createMedication(MedicationCreateRequest request);

    // 복약 시간 상세 조회
    MedicationResponse readMedication(Long medicationId);

    // 금일 복약 시간 목록 조회 (피보호자)
    List<MedicationResponse> readTodayMedicationList(String serialNo);

    // 담당 피보호자 복약 시간 목록 조회 (보호자)
    List<MedicationResponse> readMedicationList(Long userId);

    // 복약 시간 수정
    void updateMedication(Long medicationId, MedicationUpdateRequest request);

    // 복약 시간 삭제
    void deleteMedication(Long medicationId);
}