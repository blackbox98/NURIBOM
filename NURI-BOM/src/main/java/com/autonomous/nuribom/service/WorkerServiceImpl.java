package com.autonomous.nuribom.service;

import com.autonomous.nuribom.common.config.security.util.JwtUtil;
import com.autonomous.nuribom.common.exception.DuplicateException;
import com.autonomous.nuribom.common.exception.NotFoundException;
import com.autonomous.nuribom.domain.entity.*;
import com.autonomous.nuribom.domain.repository.*;
import com.autonomous.nuribom.dto.request.worker.WorkerCreateRequest;
import com.autonomous.nuribom.dto.request.worker.WorkerLoginRequest;
import com.autonomous.nuribom.dto.request.worker.WorkerUpdateRequest;
import com.autonomous.nuribom.dto.response.carelist.CareListResponse;
import com.autonomous.nuribom.dto.response.visit.VisitResponse;
import com.autonomous.nuribom.dto.response.worker.WorkerResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.autonomous.nuribom.common.exception.NotFoundException.*;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class WorkerServiceImpl implements WorkerService {
    private final WorkerRepository workerRepository;
    private final UserRepository userRepository;
    private final CareListRepository careListRepository;
    private final MedicationRepository medicationRepository;
    private final NotificationRepository notificationRepository;
    private final VisitRepository visitRepository;
    private final ActSuggestRepository actSuggestRepository;
    private final EmotionHistoryRepository emotionHistoryRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    // 보호자 회원가입
    @Override
    @Transactional
    public Long createWorker(WorkerCreateRequest request) {
        if (workerRepository.findByWorkerWebId(request.getWorkerWebId()).isPresent()) {
            throw new DuplicateException(String.format("%s 은/는 이미 가입된 보호자입니다.", request.getWorkerWebId()));
        } else {
            Worker worker = Worker.createWorker()
                    .workerWebId(request.getWorkerWebId())
                    .workerWebPwd(passwordEncoder.encode(request.getWorkerWebPwd()))
                    .workerName(request.getWorkerName())
                    .workerPhone(request.getWorkerPhone())
                    .workerProfileImg(request.getWorkerProfileImg())
                    .build();
            return workerRepository.save(worker).getId();
        }
    }

    // 아이디 체크
    @Override
    public Boolean idCheck(String workerWebId) {
        return workerRepository.findByWorkerWebId(workerWebId).isPresent();
    }

    // 보호자 로그인
    @Override
    public Integer loginWorker(WorkerLoginRequest request) {
        int statusCode;
        Optional<Worker> worker = workerRepository.findByWorkerWebId(request.getWorkerWebId());
        // 해당 아이디를 가진 보호자가 존재하지 않는 경우
        if (!worker.isPresent()) {
            statusCode = 404;
        } else {
            //비밀번호 확인
            if (passwordEncoder.matches(request.getWorkerWebPwd(), worker.get().getWorkerWebPwd())) {
                // 정상적으로 로그인이 가능한 경우
                statusCode = 200;
            } else { // 비밀번호가 틀린 경우
                statusCode = 404;
            }
        }
        return statusCode;
    }

    // 토큰 발급
    @Override
    @Transactional
    public String getAccessToken(WorkerLoginRequest request) {
        Optional<Worker> worker = workerRepository.findByWorkerWebId(request.getWorkerWebId());
        if (!worker.isPresent()) {
            throw new NotFoundException(WORKER_NOT_FOUND);
        } else {
            return jwtUtil.createToken(worker.get().getId());
        }
    }

    // 아이디 찾기
    @Override
    public String findIdByNameAndPhone(String workerName, String workerPhone) {
        Worker worker = workerRepository.findByWorkerNameAndWorkerPhone(workerName, workerPhone)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        return worker.getWorkerWebId();
    }

    // 비밀번호 찾기
    @Override
    public String findPwdByWebIdAndNameAndPhone(String workerWebId, String workerName, String workerPhone) {
        Worker worker = workerRepository.findByWorkerWebIdAndWorkerNameAndWorkerPhone(workerWebId, workerName, workerPhone)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        String newPwd = getNewPwd();
        updateWorkerPwd(worker.getWorkerWebId(), newPwd);
        return newPwd;
    }

    // 비밀번호 변경
    @Override
    @Transactional
    public void updateWorkerPwd(String workerWebId, String newPwd) {
        Worker worker = workerRepository.findByWorkerWebId(workerWebId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        worker.updatePwd(passwordEncoder.encode(newPwd));
        workerRepository.save(worker);
    }

    // 보호자 정보 조회
    @Override
    public WorkerResponse readWorker(Long workerId) {
        Worker worker = workerRepository.findById(workerId)
                .orElseThrow(() -> new NotFoundException(WORKER_NOT_FOUND));
        List<CareListResponse> careListResponses = getWorkerCareList(worker, careListRepository);

        List<Visit> visits = visitRepository.findByWorker(worker);
        List<VisitResponse> visitResponses = new ArrayList<>();
        if (!visits.isEmpty()) {
            List<VisitResponse> list = new ArrayList<>();
            for (Visit visit : visitRepository.findByWorker(worker)) {
                VisitResponse response = VisitResponse.response(visit);
                list.add(response);
            }
            visitResponses = list;
        }
        return WorkerResponse.response(worker, careListResponses, visitResponses);
    }

    // 담당 피보호자 목록 가져오기
    public static List<CareListResponse> getWorkerCareList(Worker worker, CareListRepository careListRepository) {
        List<CareList> careLists = careListRepository.findByWorker(worker);
        List<CareListResponse> careListResponses = new ArrayList<>();
        if (!careLists.isEmpty()) {
            List<CareListResponse> list = new ArrayList<>();
            for (CareList careList : careListRepository.findByWorker(worker)) {
                CareListResponse response = CareListResponse.response(careList);
                list.add(response);
            }
            careListResponses = list;
        }
        return careListResponses;
    }

    // 보호자 정보 수정
    @Override
    @Transactional
    public void updateWorker(Long workerId, WorkerUpdateRequest request) {
        Worker worker = workerRepository.findById(workerId)
                .orElseThrow(() -> new NotFoundException(WORKER_NOT_FOUND));
        worker.update(
                request.getWorkerName(),
                request.getWorkerPhone(),
                request.getWorkerProfileImg()
        );
        workerRepository.save(worker);
    }

    // 회원 탈퇴 (보호자)
    @Override
    @Transactional
    public void deleteWorker(Long workerId) {
        Worker worker = workerRepository.findById(workerId)
                .orElseThrow(() -> new NotFoundException(WORKER_NOT_FOUND));
        workerRepository.delete(worker);
    }

    // 보호자 로그인 유효성 검증
    @Override
    public void validateWorker(Worker worker) {
        workerRepository.findById(worker.getId())
                .orElseThrow(() -> new NotFoundException(WORKER_NOT_FOUND));
    }

    // 보호자 <-> 피보호자 관계 검증
    @Override
    public void validateWorkerWithUser(Worker worker, Long userId) {
        workerRepository.findById(worker.getId())
                .orElseThrow(() -> new NotFoundException(WORKER_NOT_FOUND));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        if (!careListRepository.findByWorkerAndUser(worker, user).isPresent()) {
            throw new NotFoundException(CAREUSER_NOT_FOUND);
        }
    }

    // 보호자 <-> 피보호자 일련번호 관계 검증
    @Override
    public void validateWorkerWithSerialNo(Worker worker, String serialNo) {
        workerRepository.findById(worker.getId())
                .orElseThrow(() -> new NotFoundException(WORKER_NOT_FOUND));
        User user = userRepository.findBySerialNo(serialNo)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        if (!careListRepository.findByWorkerAndUser(worker, user).isPresent()) {
            throw new NotFoundException(CAREUSER_NOT_FOUND);
        }
    }

    // 보호자 <-> 피보호자 복약시간 관계 검증
    @Override
    public void validateWorkerWithMedication(Worker worker, Long medicationId) {
        workerRepository.findById(worker.getId())
                .orElseThrow(() -> new NotFoundException(WORKER_NOT_FOUND));
        Medication medication = medicationRepository.findById(medicationId)
                .orElseThrow(() -> new NotFoundException(MEDICATION_NOT_FOUND));
        if (!careListRepository.findByWorkerAndUser(worker, medication.getUser()).isPresent()) {
            throw new NotFoundException(CAREUSER_NOT_FOUND);
        }
    }

    // 보호자 <-> 피보호자 알림 관계 검증
    @Override
    public void validateWorkerWithNotification(Worker worker, Long notificationId) {
        workerRepository.findById(worker.getId())
                .orElseThrow(() -> new NotFoundException(WORKER_NOT_FOUND));
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new NotFoundException(NOTIFICATION_NOT_FOUND));
        if (!careListRepository.findByWorkerAndUser(worker, notification.getUser()).isPresent()) {
            throw new NotFoundException(CAREUSER_NOT_FOUND);
        }
    }

    // 보호자 <-> 피보호자 방문일정 관계 검증
    @Override
    public void validateWorkerWithVisit(Worker worker, Long visitId) {
        workerRepository.findById(worker.getId())
                .orElseThrow(() -> new NotFoundException(WORKER_NOT_FOUND));
        Visit visit = visitRepository.findById(visitId)
                .orElseThrow(() -> new NotFoundException(VISIT_NOT_FOUND));
        if (!careListRepository.findByWorkerAndUser(worker, visit.getUser()).isPresent()) {
            throw new NotFoundException(CAREUSER_NOT_FOUND);
        }
    }

    // 보호자 <-> 피보호자 활동 권유 시간 관계 검증
    @Override
    public void validateWorkerWithActSuggest(Worker worker, Long actSuggestId) {
        workerRepository.findById(worker.getId())
                .orElseThrow(() -> new NotFoundException(WORKER_NOT_FOUND));
        ActSuggest actSuggest = actSuggestRepository.findById(actSuggestId)
                .orElseThrow(() -> new NotFoundException(ACTSUGGEST_NOT_FOUND));
        if (!careListRepository.findByWorkerAndUser(worker, actSuggest.getUser()).isPresent()) {
            throw new NotFoundException(CAREUSER_NOT_FOUND);
        }
    }

    // 보호자 <-> 피보호자 감정 기록 관계 검증
    @Override
    public void validateWorkerWithEmotionHistory(Worker worker, Long emotionHistoryId) {
        workerRepository.findById(worker.getId())
                .orElseThrow(() -> new NotFoundException(WORKER_NOT_FOUND));
        EmotionHistory emotionHistory = emotionHistoryRepository.findById(emotionHistoryId)
                .orElseThrow(() -> new NotFoundException(EMOTIONHISTORY_NOT_FOUND));
        if (!careListRepository.findByWorkerAndUser(worker, emotionHistory.getUser()).isPresent()) {
            throw new NotFoundException(CAREUSER_NOT_FOUND);
        }
    }

    // 임시 비밀번호 생성
    @Override
    public String getNewPwd() {
        char[] charArr = new char[]{'0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
                'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
                'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
        };
        StringBuilder newPwd = new StringBuilder();
        // 문자 배열 길이의 값을 랜덤으로 12개를 뽑아 비밀번호 생성
        int idx;
        for (int i = 0; i < 12; i++) {
            idx = (int) (charArr.length * Math.random());
            newPwd.append(charArr[idx]);
        }
        return newPwd.toString();
    }
}