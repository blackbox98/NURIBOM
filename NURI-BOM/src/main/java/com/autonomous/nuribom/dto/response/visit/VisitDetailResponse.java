package com.autonomous.nuribom.dto.response.visit;

import com.autonomous.nuribom.domain.entity.type.IsVisited;
import com.autonomous.nuribom.dto.response.BaseResponseBody;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("VisitDetailResponse")
public class VisitDetailResponse extends BaseResponseBody {
    // 방문일정 식별번호
    private Long id;

    // 보호자 ID
    private Long workerId;

    // 보호자 이름
    private String workerName;

    // 피보호자 ID
    private Long userId;

    // 피보호자 이름
    private String userName;

    // 방문 일자
    @JsonFormat(shape= JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
    private LocalDateTime visitDate;

    // 방문 내용
    private String contents;

    // 방문 여부
    private IsVisited isVisited;

    public static VisitDetailResponse of(Integer statusCode, String message, VisitResponse visitResponse) {
        VisitDetailResponse response = new VisitDetailResponse();
        response.setStatusCode(statusCode);
        response.setMessage(message);
        response.setId(visitResponse.getId());
        response.setWorkerId(visitResponse.getWorkerId());
        response.setWorkerName(visitResponse.getWorkerName());
        response.setUserId(visitResponse.getId());
        response.setUserName(visitResponse.getUserName());
        response.setVisitDate(visitResponse.getVisitDate());
        response.setContents(visitResponse.getContents());
        response.setIsVisited(visitResponse.getIsVisited());
        return response;
    }
}
