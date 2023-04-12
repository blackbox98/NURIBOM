package com.autonomous.nuribom.service;

import com.autonomous.nuribom.common.exception.NotFoundException;
import com.autonomous.nuribom.domain.entity.CareList;
import com.autonomous.nuribom.domain.entity.User;
import com.autonomous.nuribom.domain.entity.Worker;
import com.autonomous.nuribom.domain.repository.CareListRepository;
import com.autonomous.nuribom.domain.repository.UserRepository;
import com.autonomous.nuribom.domain.repository.WorkerRepository;
import com.autonomous.nuribom.dto.request.carelist.CareListRequest;
import com.autonomous.nuribom.dto.response.carelist.CareListResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.autonomous.nuribom.common.exception.NotFoundException.USER_NOT_FOUND;
import static com.autonomous.nuribom.common.exception.NotFoundException.WORKER_NOT_FOUND;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CareListServiceImpl implements CareListService {
    private final WorkerRepository workerRepository;
    private final UserRepository userRepository;
    private final CareListRepository careListRepository;

    // 담당 피보호자 정보 등록
    @Override
    @Transactional
    public Long createCareList(Long workerId, CareListRequest request) {
        Worker worker = workerRepository.findById(workerId)
                .orElseThrow(() -> new NotFoundException(WORKER_NOT_FOUND));
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        CareList careList = CareList.createCareList()
                .worker(worker)
                .user(user)
                .build();
        return careListRepository.save(careList).getId();
    }

    // 담당 피보호자 목록 조회
    @Override
    public List<CareListResponse> readCareListByWorker(Long workerId) {
        Worker worker = workerRepository.findById(workerId)
                .orElseThrow(() -> new NotFoundException(WORKER_NOT_FOUND));
        return WorkerServiceImpl.getWorkerCareList(worker, careListRepository);
    }
}
