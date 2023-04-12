package com.autonomous.nuribom.dto.request.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserCreateRequest {
    // 셋탑박스 일련번호
    @NotNull
    private String serialNo;

    // 피보호자 이름
    @NotNull
    private String userName;

    // 피보호자 출생년도
    @NotNull
    private String userBirthYear;

    // 피보호자 출생월
    @NotNull
    private String userBirthMonth;

    // 피보호자 출생일
    @NotNull
    private String userBirthDate;

    // 피보호자 주소
    @NotNull
    private String userAddress;

    // 피보호자 이미지
    @NotNull
    private String userProfileImg;
}
