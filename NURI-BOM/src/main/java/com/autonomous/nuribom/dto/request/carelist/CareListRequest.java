package com.autonomous.nuribom.dto.request.carelist;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CareListRequest {
    // 피보호자 식별번호
    @NotNull
    private Long userId;
}
