package com.autonomous.nuribom.dto.request.actsuggest;

import com.autonomous.nuribom.domain.entity.type.Activity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ActSuggestUpdateRequest {
    // 활동 종류
    @NotNull
    private Activity activity;

    // 활동 시간 (시)
    @NotNull
    private String activity_hour;

    // 활동 시간 (분)
    @NotNull
    private String activity_minutes;
}
