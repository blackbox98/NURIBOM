package com.autonomous.nuribom.service;

import com.autonomous.nuribom.common.exception.DuplicateException;
import com.autonomous.nuribom.common.exception.NotFoundException;
import com.autonomous.nuribom.domain.entity.*;
import com.autonomous.nuribom.domain.entity.type.IsVisited;
import com.autonomous.nuribom.domain.repository.*;
import com.autonomous.nuribom.dto.request.user.UserCreateRequest;
import com.autonomous.nuribom.dto.request.user.UserUpdateRequest;
import com.autonomous.nuribom.dto.response.actsuggest.ActSuggestResponse;
import com.autonomous.nuribom.dto.response.carelist.CareListResponse;
import com.autonomous.nuribom.dto.response.emotionHistory.EmotionHistoryResponse;
import com.autonomous.nuribom.dto.response.medication.MedicationResponse;
import com.autonomous.nuribom.dto.response.user.UserResponse;
import com.autonomous.nuribom.dto.response.visit.VisitResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.TextStyle;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

import static com.autonomous.nuribom.common.exception.NotFoundException.USER_NOT_FOUND;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final ActSuggestRepository actSuggestRepository;
    private final CareListRepository careListRepository;
    private final MedicationRepository medicationRepository;
    private final VisitRepository visitRepository;
    private final EmotionHistoryRepository emotionHistoryRepository;

    // 피보호자 정보 등록
    @Override
    @Transactional
    public Long createUser(UserCreateRequest request) {
        if (userRepository.findBySerialNo(request.getSerialNo()).isPresent()) {
            throw new DuplicateException("이미 등록된 기기입니다.");
        } else {
            User user = User.createUser()
                    .serialNo(request.getSerialNo())
                    .userName(request.getUserName())
                    .userBirthYear(request.getUserBirthYear())
                    .userBirthMonth(request.getUserBirthMonth())
                    .userBirthDate(request.getUserBirthDate())
                    .userAddress(request.getUserAddress())
                    .userProfileImg(request.getUserProfileImg())
                    .build();
            return userRepository.save(user).getId();
        }
    }

    // 피보호자 정보 상세 조회
    @Override
    public UserResponse readUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        return getUserResponse(user);
    }

    // 피보호자 본인 정보 상세 조회
    @Override
    public UserResponse readUserOwn(String serialNo) {
        User user = userRepository.findBySerialNo(serialNo)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        return getUserResponse(user);
    }

    // 피보호자 상세 정보 가져오기
    private UserResponse getUserResponse(User user) {
        Optional<CareList> careList = careListRepository.findByUser(user);
        CareListResponse careListResponse = null;
        if (careList.isPresent()) careListResponse = CareListResponse.response(careList.get());
        List<MedicationResponse> medicationResponses = getUserTodayMedication(user, medicationRepository);
        List<VisitResponse> visitResponses = getUserVisit(user, visitRepository);
        List<ActSuggestResponse> actSuggestResponses = getUserActSuggest(user, actSuggestRepository);
        List<EmotionHistoryResponse> emotionHistoryResponses = getUserEmotionHistoryList(user, emotionHistoryRepository);
        return UserResponse.response(user, careListResponse, medicationResponses, visitResponses, actSuggestResponses, emotionHistoryResponses);
    }

    // 피보호자 복약시간 정보 가져오기
    static List<MedicationResponse> getUserTodayMedication(User user, MedicationRepository medicationRepository) {
        List<Medication> medications = medicationRepository.findByUser(user);
        List<MedicationResponse> medicationResponses = new ArrayList<>();
        String today = LocalDate.now().getDayOfWeek().getDisplayName(TextStyle.SHORT, Locale.US).toLowerCase();
        if (!medications.isEmpty()) {
            List<MedicationResponse> list = new ArrayList<>();
            for (Medication medication : medications) {
                boolean correct = false;
                switch (today) {
                    case "sun":
                        if (medication.getSun()) {
                            correct = true;
                        }
                        break;
                    case "mon":
                        if (medication.getMon()) {
                            correct = true;
                        }
                        break;
                    case "tue":
                        if (medication.getTue()) {
                            correct = true;
                        }
                        break;
                    case "wed":
                        if (medication.getWed()) {
                            correct = true;
                        }
                        break;
                    case "thu":
                        if (medication.getThu()) {
                            correct = true;
                        }
                        break;
                    case "fri":
                        if (medication.getFri()) {
                            correct = true;
                        }
                        break;
                    case "sat":
                        if (medication.getSat()) {
                            correct = true;
                        }
                        break;
                }
                if (correct) {
                    MedicationResponse response = MedicationResponse.response(medication);
                    list.add(response);
                }
            }
            medicationResponses = list;
        }
        return medicationResponses;
    }

    // 피보호자 방문일정 가져오기
    static List<VisitResponse> getUserVisit(User user, VisitRepository visitRepository) {
        List<Visit> visits = visitRepository.findByUser(user);
        List<VisitResponse> visitResponses = new ArrayList<>();
        if (!visits.isEmpty()) {
            List<VisitResponse> list = new ArrayList<>();
            for (Visit visit : visits) {
                VisitResponse response = VisitResponse.response(visit);
                list.add(response);
            }
            visitResponses = list;
        }
        return visitResponses;
    }

    // 피보호자 활동 권유 시간 가져오기
    static List<ActSuggestResponse> getUserActSuggest(User user, ActSuggestRepository actSuggestRepository) {
        List<ActSuggest> actSuggests = actSuggestRepository.findByUser(user);
        List<ActSuggestResponse> actSuggestResponses = new ArrayList<>();
        if (!actSuggests.isEmpty()) {
            List<ActSuggestResponse> list = new ArrayList<>();
            for (ActSuggest actSuggest : actSuggests) {
                ActSuggestResponse response = ActSuggestResponse.response(actSuggest);
                list.add(response);
            }
            actSuggestResponses = list;
        }
        return actSuggestResponses;
    }

    // 피보호자 감정 기록 가져오기 (당일 감정 기록)
    static EmotionHistoryResponse getUserEmotionHistory(User user, EmotionHistoryRepository emotionHistoryRepository) {
        return emotionHistoryRepository.findByUserAndEmotionHistoryDateAfter(user, LocalDate.now().atStartOfDay()).isPresent() ? EmotionHistoryResponse.response(emotionHistoryRepository.findByUserAndEmotionHistoryDateAfter(user, LocalDate.now().atStartOfDay()).get()) : null;
    }

    // 피보호자 감정 기록 목록 가져오기 (당일 포함 과거 감정 기록)
    static List<EmotionHistoryResponse> getUserEmotionHistoryList(User user, EmotionHistoryRepository emotionHistoryRepository) {
        List<EmotionHistory> emotionHistories = emotionHistoryRepository.findAllByUser(user);
        List<EmotionHistoryResponse> emotionHistoryResponses = new ArrayList<>();
        if (!emotionHistories.isEmpty()) {
            List<EmotionHistoryResponse> list = new ArrayList<>();
            for (EmotionHistory emotionHistory : emotionHistories) {
                EmotionHistoryResponse response = EmotionHistoryResponse.response(emotionHistory);
                list.add(response);
            }
            emotionHistoryResponses = list;
        }
        return emotionHistoryResponses;
    }

    // 피보호자 정보 수정
    @Override
    @Transactional
    public void updateUser(Long userId, UserUpdateRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        user.update(
                request.getUserName(),
                request.getUserBirthYear(),
                request.getUserBirthMonth(),
                request.getUserBirthDate(),
                request.getUserAddress(),
                request.getUserProfileImg()
        );
        userRepository.save(user);
    }

    // 피보호자 등록 해제
    @Override
    @Transactional
    public void deleteUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        userRepository.delete(user);
    }

    // 최근 방문 일자 갱신
    @Override
    @Transactional
    public void updateLastVisit(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        Visit visit = visitRepository.findTopByIsVisitedEqualsAndVisitDateBeforeOrderByVisitDateDesc(IsVisited.VISITED, LocalDateTime.now()).isPresent() ? visitRepository.findTopByIsVisitedEqualsAndVisitDateBeforeOrderByVisitDateDesc(IsVisited.VISITED, LocalDateTime.now()).get() : null;
        if (visit != null) {
            user.updateLastVisit(visit.getVisitDate());
            userRepository.save(user);
        }
    }

    // 셋탑박스 일련번호 수정
    @Override
    @Transactional
    public void updateSerialNo(String serialNo) {
        User user = userRepository.findBySerialNo(serialNo)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        user.updateSerialNo(serialNo);
        userRepository.save(user);
    }
}
