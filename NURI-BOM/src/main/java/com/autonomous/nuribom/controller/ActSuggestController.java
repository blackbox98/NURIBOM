package com.autonomous.nuribom.controller;

import com.autonomous.nuribom.common.config.web.LoginWorker;
import com.autonomous.nuribom.domain.entity.Worker;
import com.autonomous.nuribom.dto.request.actsuggest.ActSuggestCreateRequest;
import com.autonomous.nuribom.dto.request.actsuggest.ActSuggestUpdateRequest;
import com.autonomous.nuribom.dto.response.BaseResponseBody;
import com.autonomous.nuribom.dto.response.actsuggest.ActSuggestCreateResponse;
import com.autonomous.nuribom.dto.response.actsuggest.ActSuggestDetailResponse;
import com.autonomous.nuribom.dto.response.actsuggest.ActSuggestGroupResponse;
import com.autonomous.nuribom.service.ActSuggestService;
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
@RequestMapping("/actsuggest")
@RequiredArgsConstructor
@Api(tags = {"활동 권유 시간 API"})
public class ActSuggestController {
    private final WorkerService workerService;
    private final ActSuggestService actSuggestService;

    // 활동 권유 시간 등록
    @PostMapping
    @ApiOperation(value = "활동 권유 시간 등록", notes = "활동 권유 시간을 등록합니다.")
    public ResponseEntity<ActSuggestCreateResponse> createActSuggest(
            @ApiIgnore @LoginWorker Worker worker,
            @Valid @RequestBody ActSuggestCreateRequest request
    ) {
        workerService.validateWorkerWithUser(worker, request.getUserId());
        Long actSuggestId = actSuggestService.createActSuggest(request);
        return ResponseEntity.status(HttpStatus.OK).body(ActSuggestCreateResponse.of(200, "Success", actSuggestId));
    }

    // 활동 권유 시간 상세 조회
    @GetMapping("/{actSuggestId}")
    @ApiOperation(value = "활동 권유 시간 상세 조회", notes = "활동 권유 시간을 상세 조회합니다.")
    public ResponseEntity<ActSuggestDetailResponse> readActSuggest(
            @ApiIgnore @LoginWorker Worker worker,
            @PathVariable Long actSuggestId
    ) {
        workerService.validateWorkerWithActSuggest(worker, actSuggestId);
        return ResponseEntity.status(HttpStatus.OK).body(ActSuggestDetailResponse.of(200, "Success", actSuggestService.readActSuggest(actSuggestId)));
    }

    // 활동 권유 시간 목록 조회
    @GetMapping("/users/{serialNo}")
    @ApiOperation(value = "활동 권유 시간 목록 조회", notes = "활동 권유 시간 목록을 조회합니다.")
    public ResponseEntity<ActSuggestGroupResponse> readActSuggestList(
            @PathVariable String serialNo
    ) {
        return ResponseEntity.status(HttpStatus.OK).body(ActSuggestGroupResponse.of(200, "Success", actSuggestService.readActSuggestList(serialNo)));
    }

    // 활동 권유 시간 수정
    @PutMapping("/{actSuggestId}")
    @ApiOperation(value = "활동 권유 시간 수정", notes = "활동 권유 시간을 수정합니다.")
    public ResponseEntity<BaseResponseBody> updateActSuggest(
            @ApiIgnore @LoginWorker Worker worker,
            @PathVariable Long actSuggestId,
            @Valid @RequestBody ActSuggestUpdateRequest request
    ) {
        workerService.validateWorkerWithActSuggest(worker, actSuggestId);
        actSuggestService.updateActSuggest(actSuggestId, request);
        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(200, "Success"));
    }

    // 활동 권유 시간 삭제
    @DeleteMapping("/{actSuggestId}")
    @ApiOperation(value = "활동 권유 시간 삭제", notes = "활동 권유 시간을 삭제합니다.")
    public ResponseEntity<BaseResponseBody> deleteActSuggest(
            @ApiIgnore @LoginWorker Worker worker,
            @PathVariable Long actSuggestId
    ) {
        workerService.validateWorkerWithActSuggest(worker, actSuggestId);
        actSuggestService.deleteActSuggest(actSuggestId);
        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(200, "Success"));
    }
}
