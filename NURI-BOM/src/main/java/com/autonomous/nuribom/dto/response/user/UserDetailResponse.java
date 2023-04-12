package com.autonomous.nuribom.dto.response.user;

import com.autonomous.nuribom.dto.response.BaseResponseBody;
import com.autonomous.nuribom.dto.response.actsuggest.ActSuggestResponse;
import com.autonomous.nuribom.dto.response.carelist.CareListResponse;
import com.autonomous.nuribom.dto.response.emotionHistory.EmotionHistoryResponse;
import com.autonomous.nuribom.dto.response.medication.MedicationResponse;
import com.autonomous.nuribom.dto.response.visit.VisitResponse;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("UserDetailResponse")
public class UserDetailResponse extends BaseResponseBody {
    // 피보호자 식별번호
    private Long id;

    // 셋탑박스 일련번호
    private String serialNo;

    // 피보호자 이름
    private String userName;

    // 피보호자 출생년도
    private String userBirthYear;

    // 피보호자 출생월
    private String userBirthMonth;

    // 피보호자 출생일
    private String userBirthDate;

    // 피보호자 주소
    private String userAddress;

    // 피보호자 이미지
    private String userProfileImg;

    // 보호자 <-> 피보호자 최근 방문 일자
    @JsonFormat(shape= JsonFormat.Shape.STRING, pattern="yyyy-MM-dd", timezone="Asia/Seoul")
    private LocalDateTime lastVisit;

    // 담당 보호자
    private CareListResponse careListResponse;

    // 피보호자 복약시간 목록
    private List<MedicationResponse> medicationResponses;

    // 피보호자 방문일정 목록
    private List<VisitResponse> visitResponses;

    // 피보호자 활동 권유 시간 목록
    private List<ActSuggestResponse> actSuggestResponses;

    // 피보호자 감정 기록 목록
    private List<EmotionHistoryResponse> emotionHistoryResponses;

    public static UserDetailResponse of(Integer statusCode, String message, UserResponse userResponse) {
        UserDetailResponse response = new UserDetailResponse();
        response.setStatusCode(statusCode);
        response.setMessage(message);
        response.setId(userResponse.getId());
        response.setSerialNo(userResponse.getSerialNo());
        response.setUserName(userResponse.getUserName());
        response.setUserBirthYear(userResponse.getUserBirthYear());
        response.setUserBirthMonth(userResponse.getUserBirthMonth());
        response.setUserBirthDate(userResponse.getUserBirthDate());
        response.setUserAddress(userResponse.getUserAddress());
        response.setUserProfileImg(userResponse.getUserProfileImg());
        response.setLastVisit(userResponse.getLastVisit());
        response.setCareListResponse(userResponse.getCareListResponse());
        response.setMedicationResponses(userResponse.getMedicationResponses());
        response.setVisitResponses(userResponse.getVisitResponses());
        response.setActSuggestResponses(userResponse.getActSuggestResponses());
        response.setEmotionHistoryResponses(userResponse.getEmotionHistoryResponses());
        return response;
    }
}
