package com.autonomous.nuribom.domain.entity;

import com.autonomous.nuribom.domain.entity.type.Role;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Worker {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "worker_id")
    private Long id;

    // 보호자 아이디
    @NotNull
    @Column(length = 30)
    private String workerWebId;

    // 보호자 패스워드
    @NotNull
    private String workerWebPwd;

    // 보호자 이름
    @NotNull
    @Column(length = 20)
    private String workerName;

    // 보호자 전화번호
    @NotNull
    @Column(length = 20)
    private String workerPhone;

    // 보호자 이미지
    @NotNull
    @Column(length = 20)
    private String workerProfileImg;

    // 권한 - ROLE_USER
    @NotNull
    @Enumerated(EnumType.STRING)
    private Role role;

    // 보호자 - 담당 보호자 리스트 연관 관계
    @OneToMany(mappedBy = "worker", cascade = CascadeType.ALL, orphanRemoval = true)
    private final List<CareList> careLists = new ArrayList<>();

    // 보호자 - 알림 연관 관계
    @OneToMany(mappedBy = "worker", cascade = CascadeType.ALL, orphanRemoval = true)
    private final List<Notification> notifications = new ArrayList<>();

    // 보호자 - 방문일정 연관 관계
    @OneToMany(mappedBy = "worker", cascade = CascadeType.ALL, orphanRemoval = true)
    private final List<Visit> visits = new ArrayList<>();

    @Builder(builderMethodName = "createWorker")
    public Worker(String workerWebId, String workerWebPwd, String workerName, String workerPhone, String workerProfileImg) {
        this.workerWebId = workerWebId;
        this.workerWebPwd = workerWebPwd;
        this.workerName = workerName;
        this.workerPhone = workerPhone;
        this.workerProfileImg = workerProfileImg;
        this.role = Role.ROLE_USER;
    }

    public void update(String workerName, String workerPhone, String workerProfileImg) {
        this.workerName = workerName;
        this.workerPhone = workerPhone;
        this.workerProfileImg = workerProfileImg;
    }

    public void updatePwd(String workerWebPwd) {
        this.workerWebPwd = workerWebPwd;
    }
}
