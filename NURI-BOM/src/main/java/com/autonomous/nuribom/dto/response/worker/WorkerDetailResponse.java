package com.autonomous.nuribom.dto.response.worker;

import com.autonomous.nuribom.dto.response.BaseResponseBody;
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
@ApiModel("WorkerDetailResponse")
public class WorkerDetailResponse extends BaseResponseBody {
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

    public static WorkerDetailResponse of(Integer statusCode, String message, WorkerResponse workerResponse) {
        WorkerDetailResponse response = new WorkerDetailResponse();
        response.setStatusCode(statusCode);
        response.setMessage(message);
        response.setId(workerResponse.getId());
        response.setWorkerWebId(workerResponse.getWorkerWebId());
        response.setWorkerName(workerResponse.getWorkerName());
        response.setWorkerPhone(workerResponse.getWorkerPhone());
        response.setWorkerProfileImg(workerResponse.getWorkerProfileImg());
        response.setCareListResponses(workerResponse.getCareListResponses());
        response.setVisitResponses(workerResponse.getVisitResponses());
        return response;
    }
}
