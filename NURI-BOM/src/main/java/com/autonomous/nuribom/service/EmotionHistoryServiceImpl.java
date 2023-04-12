package com.autonomous.nuribom.service;

import com.autonomous.nuribom.common.exception.DuplicateException;
import com.autonomous.nuribom.common.exception.NotFoundException;
import com.autonomous.nuribom.domain.entity.EmotionHistory;
import com.autonomous.nuribom.domain.entity.User;
import com.autonomous.nuribom.domain.entity.type.Emotion;
import com.autonomous.nuribom.domain.repository.EmotionHistoryRepository;
import com.autonomous.nuribom.domain.repository.UserRepository;
import com.autonomous.nuribom.dto.request.emotionHistory.EmotionHistoryCreateRequest;
import com.autonomous.nuribom.dto.request.emotionHistory.EmotionHistoryUpdateRequest;
import com.autonomous.nuribom.dto.response.emotionHistory.EmotionHistoryResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

import static com.autonomous.nuribom.common.exception.NotFoundException.EMOTIONHISTORY_NOT_FOUND;
import static com.autonomous.nuribom.common.exception.NotFoundException.USER_NOT_FOUND;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class EmotionHistoryServiceImpl implements EmotionHistoryService {
    private final UserRepository userRepository;
    private final EmotionHistoryRepository emotionHistoryRepository;

    // 당일 감정 기록 생성
    @Override
    @Transactional
    public Long createEmotionHistory(EmotionHistoryCreateRequest request) {
        User user = userRepository.findBySerialNo(request.getSerialNo())
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        if (emotionHistoryRepository.findTopByUserOrderByEmotionHistoryDateDesc(user).isPresent()) {
            LocalDate targerDate = emotionHistoryRepository.findTopByUserOrderByEmotionHistoryDateDesc(user).get().getEmotionHistoryDate().toLocalDate();
            if (LocalDate.now().isEqual(targerDate)) {
                throw new DuplicateException(String.format("%s님의 금일 감정 기록이 이미 생성되어 있습니다.", user.getUserName()));
            }
        }

        EmotionHistory emotionHistory = EmotionHistory.createEmotionHistory()
                .user(user)
                .build();
        return emotionHistoryRepository.save(emotionHistory).getId();
    }

    // 감정 기록 조회 (당일 감정 기록)
    @Override
    public EmotionHistoryResponse readEmotionHistory(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        return UserServiceImpl.getUserEmotionHistory(user, emotionHistoryRepository);
    }

    // 감정 기록 목록 조회 (당일 포함 과거 감정 기록)
    @Override
    public List<EmotionHistoryResponse> readEmotionHistoryList(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        return UserServiceImpl.getUserEmotionHistoryList(user, emotionHistoryRepository);
    }

    // 당일 감정 기록 수정
    @Override
    @Transactional
    public void updateEmotionHistory(String serialNo, EmotionHistoryUpdateRequest request) {
        User user = userRepository.findBySerialNo(serialNo)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        EmotionHistory emotionHistory = emotionHistoryRepository.findByUserAndEmotionHistoryDateAfter(user, LocalDate.now().atStartOfDay())
                .orElseThrow(() -> new NotFoundException(EMOTIONHISTORY_NOT_FOUND));
        int good = emotionHistory.getGood() + request.getGood();
        int normal = emotionHistory.getNormal() + request.getNormal();
        int bad = emotionHistory.getBad() + request.getBad();
        Emotion emotion;
        if (good >= normal && good > bad) {
            emotion = Emotion.GOOD;
        } else if (normal > good && normal > bad) {
            emotion = Emotion.NORMAL;
        } else if (bad > good) {
            emotion = Emotion.BAD;
        } else {
            emotion = Emotion.NORMAL;
        }
        emotionHistory.update(
                emotion,
                good,
                normal,
                bad
        );
        emotionHistoryRepository.save(emotionHistory);
    }

    // 감정 기록 삭제
    @Override
    @Transactional
    public void deleteEmotionHistory(Long emotionHistoryId) {
        EmotionHistory emotionHistory = emotionHistoryRepository.findById(emotionHistoryId)
                .orElseThrow(() -> new NotFoundException(EMOTIONHISTORY_NOT_FOUND));
        emotionHistoryRepository.delete(emotionHistory);
    }
}
