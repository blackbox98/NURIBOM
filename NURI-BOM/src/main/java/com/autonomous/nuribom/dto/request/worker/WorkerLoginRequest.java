package com.autonomous.nuribom.dto.request.worker;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WorkerLoginRequest {
    @NotBlank
    private String workerWebId;

    @NotBlank
    private String workerWebPwd;
}
