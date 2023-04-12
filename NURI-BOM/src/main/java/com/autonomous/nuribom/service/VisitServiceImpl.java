package com.autonomous.nuribom.service;

import com.autonomous.nuribom.common.exception.NotFoundException;
import com.autonomous.nuribom.domain.entity.User;
import com.autonomous.nuribom.domain.entity.Visit;
import com.autonomous.nuribom.domain.entity.Worker;
import com.autonomous.nuribom.domain.repository.UserRepository;
import com.autonomous.nuribom.domain.repository.VisitRepository;
import com.autonomous.nuribom.domain.repository.WorkerRepository;
import com.autonomous.nuribom.dto.request.visit.VisitCreateRequest;
import com.autonomous.nuribom.dto.request.visit.VisitUpdateRequest;
import com.autonomous.nuribom.dto.response.visit.VisitResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.autonomous.nuribom.common.exception.NotFoundException.*;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class VisitServiceImpl implements VisitService {
    private final WorkerRepository workerRepository;
    private final UserRepository userRepository;
    private final VisitRepository visitRepository;

    // 방문 일정 등록
    @Override
    @Transactional
    public Long createVisit(Long workerId, VisitCreateRequest request) {
        Worker worker = workerRepository.findById(workerId)
                .orElseThrow(() -> new NotFoundException(WORKER_NOT_FOUND));
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        Visit saveVisit = Visit.createVisit()
                .worker(worker)
                .user(user)
                .visitDate(request.getVisitDate())
                .contents(request.getContents())
                .build();
        return visitRepository.save(saveVisit).getId();
    }

    // 방문 일정 상세 조회
    @Override
    public VisitResponse readVisit(Long visitId) {
        Visit visit = visitRepository.findById(visitId)
                .orElseThrow(() -> new NotFoundException(VISIT_NOT_FOUND));
        return VisitResponse.response(visit);
    }

    // 방문 일정 목록 조회
    @Override
    public List<VisitResponse> readVisitList(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        return UserServiceImpl.getUserVisit(user, visitRepository);
    }

    // 방문 일정 수정
    @Override
    @Transactional
    public void updateVisit(Long visitId, VisitUpdateRequest request) {
        Visit visit = visitRepository.findById(visitId)
                .orElseThrow(() -> new NotFoundException(VISIT_NOT_FOUND));
        visit.update(
                request.getVisitDate(),
                request.getContents()
        );
        visitRepository.save(visit);
    }

    // 방문 여부 변경
    @Override
    @Transactional
    public Long visitUser(Long visitId) {
        Visit visit = visitRepository.findById(visitId)
                .orElseThrow(() -> new NotFoundException(VISIT_NOT_FOUND));
        visit.visitUser();
        visitRepository.save(visit);
        User user = userRepository.findById(visit.getUser().getId())
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        return user.getId();
    }

    // 방문 일정 삭제
    @Override
    @Transactional
    public void deleteVisit(Long visitId) {
        Visit visit = visitRepository.findById(visitId)
                .orElseThrow(() -> new NotFoundException(VISIT_NOT_FOUND));
        visitRepository.delete(visit);
    }
}
