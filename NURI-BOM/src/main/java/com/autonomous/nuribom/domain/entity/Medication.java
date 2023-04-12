package com.autonomous.nuribom.domain.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Medication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "medication_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    // 약 이름
    @NotNull
    @Column(length = 20)
    private String medicine;

    // 복약 시간 (시)
    @NotNull
    @Column(length = 2)
    private String medication_hour;

    // 복약 시간 (분)
    @NotNull
    @Column(length = 2)
    private String medication_minutes;

    // 일요일
    @NotNull
    private Boolean sun;

    // 월요일
    @NotNull
    private Boolean mon;

    // 화요일
    @NotNull
    private Boolean tue;

    // 수요일
    @NotNull
    private Boolean wed;

    // 목요일
    @NotNull
    private Boolean thu;

    // 금요일
    @NotNull
    private Boolean fri;

    // 토요일
    @NotNull
    private Boolean sat;

    @Builder(builderMethodName = "createMedication")
    public Medication(User user, String medicine, String medication_hour, String medication_minutes, Boolean sun, Boolean mon, Boolean tue, Boolean wed, Boolean thu, Boolean fri, Boolean sat) {
        this.user = user;
        this.medicine = medicine;
        this.medication_hour = medication_hour;
        this.medication_minutes = medication_minutes;
        this.sun = sun;
        this.mon = mon;
        this.tue = tue;
        this.wed = wed;
        this.thu = thu;
        this.fri = fri;
        this.sat = sat;
    }

    public void update(String medicine, String medication_hour, String medication_minutes, Boolean sun, Boolean mon, Boolean tue, Boolean wed, Boolean thu, Boolean fri, Boolean sat) {
        this.medicine = medicine;
        this.medication_hour = medication_hour;
        this.medication_minutes = medication_minutes;
        this.sun = sun;
        this.mon = mon;
        this.tue = tue;
        this.wed = wed;
        this.thu = thu;
        this.fri = fri;
        this.sat = sat;
    }
}