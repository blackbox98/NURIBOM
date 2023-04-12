package com.autonomous.nuribom.dto.response.visit;

import com.autonomous.nuribom.domain.entity.Visit;
import com.autonomous.nuribom.domain.entity.type.IsVisited;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("VisitResponse")
public class VisitResponse {
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

    public static VisitResponse response(
            Visit visit
    ) {
        return new VisitResponse(
                visit.getId(),
                visit.getWorker().getId(),
                visit.getWorker().getWorkerName(),
                visit.getUser().getId(),
                visit.getUser().getUserName(),
                visit.getVisitDate(),
                visit.getContents(),
                visit.getIsVisited()
        );
    }
}
