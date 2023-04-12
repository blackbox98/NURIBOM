package com.autonomous.nuribom.service;

import com.autonomous.nuribom.domain.entity.Worker;
import com.autonomous.nuribom.dto.request.worker.WorkerCreateRequest;
import com.autonomous.nuribom.dto.request.worker.WorkerLoginRequest;
import com.autonomous.nuribom.dto.request.worker.WorkerUpdateRequest;
import com.autonomous.nuribom.dto.response.worker.WorkerResponse;

public interface WorkerService {
    // 보호자 회원가입
    Long createWorker(WorkerCreateRequest request);

    // 아이디 체크
    Boolean idCheck(String workerWebId);

    // 보호자 로그인
    Integer loginWorker(WorkerLoginRequest request);

    // 토큰 발급
    String getAccessToken(WorkerLoginRequest request);

    // 아이디 찾기
    String findIdByNameAndPhone(String workerName, String workerPhone);

    // 비밀번호 찾기
    String findPwdByWebIdAndNameAndPhone(String workerWebId, String workerName, String workerPhone);

    // 비밀번호 변경
    void updateWorkerPwd(String workerWebId, String newPwd);

    // 보호자 정보 조회
    WorkerResponse readWorker(Long workerId);

    // 보호자 정보 수정
    void updateWorker(Long workerId, WorkerUpdateRequest request);

    // 회원 탈퇴 (보호자)
    void deleteWorker(Long workerId);

    // 보호자 로그인 유효성 검증
    void validateWorker(Worker worker);

    // 보호자 <-> 피보호자 관계 검증
    void validateWorkerWithUser(Worker worker, Long userId);

    // 보호자 <-> 피보호자 일련번호 관계 검증
    void validateWorkerWithSerialNo(Worker worker, String serialNo);

    // 보호자 <-> 피보호자 복약시간 관계 검증
    void validateWorkerWithMedication(Worker worker, Long medicationId);

    // 보호자 <-> 피보호자 알림 관계 검증
    void validateWorkerWithNotification(Worker worker, Long notificationId);

    // 보호자 <-> 피보호자 방문일정 관계 검증
    void validateWorkerWithVisit(Worker worker, Long visitId);

    // 보호자 <-> 피보호자 활동 권유 시간 관계 검증
    void validateWorkerWithActSuggest(Worker worker, Long actSuggestId);

    // 보호자 <-> 피보호자 감정 기록 관계 검증
    void validateWorkerWithEmotionHistory(Worker worker, Long emotionHistoryId);

    // 임시 비밀번호 생성
    String getNewPwd();
}