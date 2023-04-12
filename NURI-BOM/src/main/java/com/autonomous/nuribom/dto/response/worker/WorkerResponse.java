package com.autonomous.nuribom.dto.response.worker;

import com.autonomous.nuribom.domain.entity.Worker;
import com.autonomous.nuribom.dto.response.carelist.CareListResponse;
import com.autonomous.nuribom.dto.response.visit.VisitResponse;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("WorkerResponse")
public class WorkerResponse {
    // 보호자 식별번호
    private Long id;

    // 보호자 아이디
    private String workerWebId;

    // 보호자 이름
    private String workerName;

    // 보호자 전화번호
    private String workerPhone;

    // 보호자 이미지
    private String workerProfileImg;

    // 담당 중인 피보호자 목록
    private List<CareListResponse> careListResponses;

    // 보호자 방문일정 목록
    private List<VisitResponse> visitResponses;

    public static WorkerResponse response(
            Worker worker,
            List<CareListResponse> careListResponses,
            List<VisitResponse> visitResponses
    ) {
        return new WorkerResponse(
                worker.getId(),
                worker.getWorkerWebId(),
                worker.getWorkerName(),
                worker.getWorkerPhone(),
                worker.getWorkerProfileImg(),
                careListResponses,
                visitResponses
        );
    }
}
