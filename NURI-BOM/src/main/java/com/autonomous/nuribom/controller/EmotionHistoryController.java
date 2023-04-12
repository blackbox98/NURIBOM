package com.autonomous.nuribom.controller;

import com.autonomous.nuribom.common.config.web.LoginWorker;
import com.autonomous.nuribom.domain.entity.Worker;
import com.autonomous.nuribom.dto.request.emotionHistory.EmotionHistoryCreateRequest;
import com.autonomous.nuribom.dto.request.emotionHistory.EmotionHistoryUpdateRequest;
import com.autonomous.nuribom.dto.response.BaseResponseBody;
import com.autonomous.nuribom.dto.response.emotionHistory.EmotionHistoryCreateResponse;
import com.autonomous.nuribom.dto.response.emotionHistory.EmotionHistoryDetailResponse;
import com.autonomous.nuribom.dto.response.emotionHistory.EmotionHistoryGroupResponse;
import com.autonomous.nuribom.service.EmotionHistoryService;
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
@RequestMapping("/emotion")
@RequiredArgsConstructor
@Api(tags = {"감정 기록 API"})
public class EmotionHistoryController {
    private final WorkerService workerService;
    private final EmotionHistoryService emotionHistoryService;

    // 당일 감정 기록 생성
    @PostMapping
    @ApiOperation(value = "당일 감정 기록 생성", notes = "당일의 감정 기록을 생성합니다.")
    public ResponseEntity<EmotionHistoryCreateResponse> createEmotionHistory(
            @Valid @RequestBody EmotionHistoryCreateRequest request
    ) {
        Long emotionHistoryId = emotionHistoryService.createEmotionHistory(request);
        return ResponseEntity.status(HttpStatus.OK).body(EmotionHistoryCreateResponse.of(200, "Success", emotionHistoryId));
    }

    // 감정 기록 조회 (당일 감정 기록)
    @GetMapping("/{userId}")
    @ApiOperation(value = "감정 기록 조회 (당일 감정 기록)", notes = "당일의 감정 기록을 조회합니다.")
    public ResponseEntity<EmotionHistoryDetailResponse> readEmotionHistory(
            @ApiIgnore @LoginWorker Worker worker,
            @PathVariable Long userId
    ) {
        workerService.validateWorkerWithUser(worker, userId);
        return ResponseEntity.status(HttpStatus.OK).body(EmotionHistoryDetailResponse.of(200, "Success", emotionHistoryService.readEmotionHistory(userId)));
    }

    // 감정 기록 목록 조회 (당일 포함 과거 감정 기록)
    @GetMapping("/list/{userId}")
    @ApiOperation(value = "감정 기록 목록 조회 (당일 포함 과거 감정 기록)", notes = "당일을 포함한 과거의 감정 기록 목록을 조회합니다.")
    public ResponseEntity<EmotionHistoryGroupResponse> readEmotionHistoryList(
            @ApiIgnore @LoginWorker Worker worker,
            @PathVariable Long userId
    ) {
        workerService.validateWorkerWithUser(worker, userId);
        return ResponseEntity.status(HttpStatus.OK).body(EmotionHistoryGroupResponse.of(200, "Success", emotionHistoryService.readEmotionHistoryList(userId)));
    }

    // 당일 감정 기록 수정
    @PutMapping("/{serialNo}")
    @ApiOperation(value = "당일 감정 기록 수정", notes = "당일의 감정 기록을 수정합니다.")
    public ResponseEntity<BaseResponseBody> updateEmotionHistory(
            @PathVariable String serialNo,
            @Valid @RequestBody EmotionHistoryUpdateRequest request
    ) {
        emotionHistoryService.updateEmotionHistory(serialNo, request);
        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(200, "Success"));
    }

    // 감정 기록 삭제
    @DeleteMapping("/{emotionHistoryId}")
    @ApiOperation(value = "감정 기록 목록 조회 (당일 포함 과거 감정 기록)", notes = "당일을 포함한 과거의 감정 기록 목록을 조회합니다.")
    public ResponseEntity<BaseResponseBody> deleteEmotionHistory(
            @ApiIgnore @LoginWorker Worker worker,
            @PathVariable Long emotionHistoryId
    ) {
        workerService.validateWorkerWithEmotionHistory(worker, emotionHistoryId);
        emotionHistoryService.deleteEmotionHistory(emotionHistoryId);
        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(200, "Success"));
    }
}
