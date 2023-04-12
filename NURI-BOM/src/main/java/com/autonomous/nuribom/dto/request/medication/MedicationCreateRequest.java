package com.autonomous.nuribom.dto.request.medication;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MedicationCreateRequest {
    // 피보호자 식별번호
    @NotNull
    private Long userId;

    // 약 이름
    @NotNull
    private String medicine;

    // 복약 시간 (시)
    @NotNull
    private String medication_hour;

    // 복약 시간 (분)
    @NotNull
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
}
