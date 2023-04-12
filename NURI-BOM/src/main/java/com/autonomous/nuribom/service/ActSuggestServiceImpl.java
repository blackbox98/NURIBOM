package com.autonomous.nuribom.service;

import com.autonomous.nuribom.common.exception.NotFoundException;
import com.autonomous.nuribom.domain.entity.ActSuggest;
import com.autonomous.nuribom.domain.entity.User;
import com.autonomous.nuribom.domain.repository.ActSuggestRepository;
import com.autonomous.nuribom.domain.repository.UserRepository;
import com.autonomous.nuribom.dto.request.actsuggest.ActSuggestCreateRequest;
import com.autonomous.nuribom.dto.request.actsuggest.ActSuggestUpdateRequest;
import com.autonomous.nuribom.dto.response.actsuggest.ActSuggestResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.autonomous.nuribom.common.exception.NotFoundException.ACTSUGGEST_NOT_FOUND;
import static com.autonomous.nuribom.common.exception.NotFoundException.USER_NOT_FOUND;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ActSuggestServiceImpl implements ActSuggestService {
    private final UserRepository userRepository;
    private final ActSuggestRepository actSuggestRepository;

    // 활동 권유 시간 설정
    @Override
    @Transactional
    public Long createActSuggest(ActSuggestCreateRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        ActSuggest actSuggest = ActSuggest.createActSuggest()
                .user(user)
                .activity(request.getActivity())
                .activity_hour(request.getActivity_hour())
                .activity_minutes(request.getActivity_minutes())
                .build();
        return actSuggestRepository.save(actSuggest).getId();
    }

    // 활동 권유 시간 상세 조회
    @Override
    public ActSuggestResponse readActSuggest(Long actSuggestId) {
        ActSuggest actSuggest = actSuggestRepository.findById(actSuggestId)
                .orElseThrow(() -> new NotFoundException(ACTSUGGEST_NOT_FOUND));
        return ActSuggestResponse.response(actSuggest);
    }

    // 활동 권유 시간 목록 조회
    @Override
    public List<ActSuggestResponse> readActSuggestList(String serialNo) {
        User user = userRepository.findBySerialNo(serialNo)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        return UserServiceImpl.getUserActSuggest(user, actSuggestRepository);
    }

    // 활동 권유 시간 수정
    @Override
    @Transactional
    public void updateActSuggest(Long actSuggestId, ActSuggestUpdateRequest request) {
        ActSuggest actSuggest = actSuggestRepository.findById(actSuggestId)
                .orElseThrow(() -> new NotFoundException(ACTSUGGEST_NOT_FOUND));
        actSuggest.update(
                request.getActivity(),
                request.getActivity_hour(),
                request.getActivity_minutes()
        );
        actSuggestRepository.save(actSuggest);
    }

    // 활동 권유 시간 삭제
    @Override
    @Transactional
    public void deleteActSuggest(Long actSuggestId) {
        ActSuggest actSuggest = actSuggestRepository.findById(actSuggestId)
                .orElseThrow(() -> new NotFoundException(ACTSUGGEST_NOT_FOUND));
        actSuggestRepository.delete(actSuggest);
    }
}
