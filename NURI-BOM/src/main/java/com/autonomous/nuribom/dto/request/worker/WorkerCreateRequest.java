package com.autonomous.nuribom.dto.request.worker;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WorkerCreateRequest {
    // 보호자 아이디
    @NotNull
    private String workerWebId;

    // 보호자 패스워드
    @NotNull
    private String workerWebPwd;

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
