package com.autonomous.nuribom.dto.response.carelist;

import com.autonomous.nuribom.domain.entity.CareList;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("CareListResponse")
public class CareListResponse {
    // 담당 보호자 리스트 식별번호
    private Long id;

    // 보호자 ID
    private Long workerId;

    // 보호자 이름
    private String workerName;

    // 피보호자 ID
    private Long userId;

    // 피보호자 이름
    private String userName;

    public static CareListResponse response(
            CareList careList
    ) {
        return new CareListResponse(
                careList.getId(),
                careList.getWorker().getId(),
                careList.getWorker().getWorkerName(),
                careList.getUser().getId(),
                careList.getUser().getUserName()
        );
    }
}