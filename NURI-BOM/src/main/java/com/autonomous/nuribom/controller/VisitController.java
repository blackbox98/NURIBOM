package com.autonomous.nuribom.controller;

import com.autonomous.nuribom.common.config.web.LoginWorker;
import com.autonomous.nuribom.domain.entity.Worker;
import com.autonomous.nuribom.dto.request.visit.VisitCreateRequest;
import com.autonomous.nuribom.dto.request.visit.VisitUpdateRequest;
import com.autonomous.nuribom.dto.response.BaseResponseBody;
import com.autonomous.nuribom.dto.response.visit.VisitCreateResponse;
import com.autonomous.nuribom.dto.response.visit.VisitDetailResponse;
import com.autonomous.nuribom.dto.response.visit.VisitGroupResponse;
import com.autonomous.nuribom.service.UserService;
import com.autonomous.nuribom.service.VisitService;
import com.autonomous.nuribom.service.WorkerService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.validation.Valid;

@RestController
@RequestMapping("/visit")
@RequiredArgsConstructor
@Api(tags = {"방문 일정 API"})
public class VisitController {
    private final WorkerService workerService;
    private final UserService userService;
    private final VisitService visitService;

    // 방문 일정 등록
    @PostMapping
    @ApiOperation(value = "방문 일정 등록", notes = "방문 일정을 등록합니다.")
    public ResponseEntity<VisitCreateResponse> createVisit(
            @ApiIgnore @LoginWorker Worker worker,
            @Valid @RequestBody VisitCreateRequest request
    ) {
        workerService.validateWorkerWithUser(worker, request.getUserId());
        Long visitId = visitService.createVisit(worker.getId(), request);
        userService.updateLastVisit(request.getUserId());
        return ResponseEntity.status(HttpStatus.OK).body(VisitCreateResponse.of(200, "Success", visitId));
    }

    // 방문 일정 상세 조회
    @GetMapping("/{visitId}")
    @ApiOperation(value = "방문 일정 상세 조회", notes = "방문 일정을 상세 조회합니다.")
    public ResponseEntity<VisitDetailResponse> readVisit(
            @ApiIgnore @LoginWorker Worker worker,
            @PathVariable Long visitId
    ) {
        workerService.validateWorkerWithVisit(worker, visitId);
        return ResponseEntity.status(HttpStatus.OK).body(VisitDetailResponse.of(200, "Success", visitService.readVisit(visitId)));
    }

    // 방문 일정 목록 조회
    @GetMapping("/users/{userId}")
    @ApiOperation(value = "방문 일정 목록 조회", notes = "방문 일정 목록을 조회합니다.")
    public ResponseEntity<VisitGroupResponse> readVisitList(
            @ApiIgnore @LoginWorker Worker worker,
            @PathVariable Long userId
    ) {
        workerService.validateWorkerWithUser(worker, userId);
        return ResponseEntity.status(HttpStatus.OK).body(VisitGroupResponse.of(200, "Success", visitService.readVisitList(userId)));
    }

    // 방문 일정 수정
    @PutMapping("/{visitId}")
    @ApiOperation(value = "방문 일정 수정", notes = "방문 일정을 수정합니다.")
    public ResponseEntity<BaseResponseBody> updateVisit(
            @ApiIgnore @LoginWorker Worker worker,
            @PathVariable Long visitId,
            @Valid @RequestBody VisitUpdateRequest request
    ) {
        workerService.validateWorkerWithVisit(worker, visitId);
        visitService.updateVisit(visitId, request);
        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(200, "Success"));
    }

    // 방문 여부 변경
    @GetMapping("/visited/{visitId}")
    @ApiOperation(value = "방문 여부 변경", notes = "방문 완료 상태로 변경합니다.")
    public ResponseEntity<BaseResponseBody> visitUser(
            @ApiIgnore @LoginWorker Worker worker,
            @PathVariable Long visitId
    ) {
        workerService.validateWorkerWithVisit(worker, visitId);
        Long userId = visitService.visitUser(visitId);
        userService.updateLastVisit(userId);
        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(200, "Success"));
    }

    // 방문 일정 삭제
    @DeleteMapping("/{visitId}")
    @ApiOperation(value = "방문 일정 삭제", notes = "방문 일정을 삭제합니다.")
    public ResponseEntity<BaseResponseBody> deleteMedication(
            @ApiIgnore @LoginWorker Worker worker,
            @PathVariable Long visitId
    ) {
        workerService.validateWorkerWithVisit(worker, visitId);
        visitService.deleteVisit(visitId);
        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(200, "Success"));
    }
}
