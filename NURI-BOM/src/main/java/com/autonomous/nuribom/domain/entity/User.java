package com.autonomous.nuribom.domain.entity;

import com.autonomous.nuribom.domain.entity.type.Role;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    // 셋탑박스 일련번호
    @NotNull
    @Column(length = 20)
    private String serialNo;

    // 피보호자 이름
    @NotNull
    @Column(length = 20)
    private String userName;

    // 피보호자 출생년도
    @NotNull
    @Column(length = 4)
    private String userBirthYear;

    // 피보호자 출생월
    @NotNull
    @Column(length = 2)
    private String userBirthMonth;

    // 피보호자 출생일
    @NotNull
    @Column(length = 2)
    private String userBirthDate;

    // 피보호자 주소
    @NotNull
    private String userAddress;

    // 피보호자 이미지
    @NotNull
    @Column(length = 20)
    private String userProfileImg;

    // 보호자 <-> 피보호자 최근 방문 일자
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDateTime lastVisit;

    // 권한 - ROLE_USER
    @NotNull
    @Enumerated(EnumType.STRING)
    private Role role;

    // 피보호자 - 담장 보호자 리스트 연관 관계
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private CareList careList;

    // 피보호자 - 복약시간 연관 관계
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private final List<Medication> medications = new ArrayList<>();

    // 피보호자 - 알림 연관 관계
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private final List<Notification> notifications = new ArrayList<>();

    // 피보호자 - 방문일정 연관 관계
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private final List<Visit> visits = new ArrayList<>();

    // 피보호자 - 활동 추천 시간 연관 관계
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private final List<ActSuggest> actSuggests = new ArrayList<>();

    // 피보호자 - 복약시간 연관 관계
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private final List<EmotionHistory> emotionHistories = new ArrayList<>();

    @Builder(builderMethodName = "createUser")
    public User(String serialNo, String userName, String userBirthYear, String userBirthMonth, String userBirthDate, String userAddress, String userProfileImg) {
        this.serialNo = serialNo;
        this.userName = userName;
        this.userBirthYear = userBirthYear;
        this.userBirthMonth = userBirthMonth;
        this.userBirthDate = userBirthDate;
        this.userAddress = userAddress;
        this.userProfileImg = userProfileImg;
        this.lastVisit = null;
        this.role = Role.ROLE_USER;
    }

    public void update(String userName, String userBirthYear, String userBirthMonth, String userBirthDate, String userAddress, String userProfileImg) {
        this.userName = userName;
        this.userBirthYear = userBirthYear;
        this.userBirthMonth = userBirthMonth;
        this.userBirthDate = userBirthDate;
        this.userAddress = userAddress;
        this.userProfileImg = userProfileImg;
    }

    public void updateSerialNo(String serialNo) {
        this.serialNo = serialNo;
    }

    public void updateLastVisit(LocalDateTime lastVisit) {
        this.lastVisit = lastVisit;
    }
}
