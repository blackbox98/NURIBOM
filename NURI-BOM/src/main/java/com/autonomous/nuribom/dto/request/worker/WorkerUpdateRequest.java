package com.autonomous.nuribom.dto.request.worker;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WorkerUpdateRequest {
    // 보호자 이름
    @NotNull
    private String workerName;

    // 보호자 전화번호
    @NotNull
    private String workerPhone;

    // 보호자 이미지
    @NotNull
    private String workerProfileImg;
}
