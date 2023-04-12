package com.autonomous.nuribom.controller;

import com.autonomous.nuribom.common.config.web.LoginWorker;
import com.autonomous.nuribom.domain.entity.Worker;
import com.autonomous.nuribom.dto.request.notification.NotificationRequest;
import com.autonomous.nuribom.dto.response.BaseResponseBody;
import com.autonomous.nuribom.dto.response.notification.NotificationCreateResponse;
import com.autonomous.nuribom.dto.response.notification.NotificationGroupResponse;
import com.autonomous.nuribom.service.NotificationService;
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
@RequestMapping("/notification")
@RequiredArgsConstructor
@Api(tags = {"알림 API"})
public class NotificationController {
    private final WorkerService workerService;
    private final NotificationService notificationService;

    // 알림 등록
    @PostMapping("/{serialNo}")
    @ApiOperation(value = "알림 등록", notes = "알림을 등록합니다.")
    public ResponseEntity<NotificationCreateResponse> create(
            @PathVariable String serialNo,
            @Valid @RequestBody NotificationRequest request
    ) {
        Long notificationId = notificationService.createNotification(serialNo, request);
        return ResponseEntity.status(HttpStatus.OK).body(NotificationCreateResponse.of(200, "Success", notificationId));
    }

    // 알림 목록 조회 (보호자)
    @GetMapping
    @ApiOperation(value = "알림 목록 조회 (보호자)", notes = "알림 목록을 보호자를 기준으로 조회합니다.")
    public ResponseEntity<NotificationGroupResponse> readListByWorker(
            @ApiIgnore @LoginWorker Worker worker
    ) {
        workerService.validateWorker(worker);
        return ResponseEntity.status(HttpStatus.OK).body(NotificationGroupResponse.of(200, "Success", notificationService.readListByWorker(worker.getId())));
    }

    // 알림 목록 조회 (피보호자)
    @GetMapping("/users/{userId}")
    @ApiOperation(value = "알림 목록 조회 (피보호자)", notes = "알림 목록을 피보호자를 기준으로 조회합니다.")
    public ResponseEntity<NotificationGroupResponse> readListByUser(
            @PathVariable Long userId
    ) {
        return ResponseEntity.status(HttpStatus.OK).body(NotificationGroupResponse.of(200, "Success", notificationService.readListByUser(userId)));
    }

    // 알림 읽기 여부 변경
    @GetMapping("/{notificationId}")
    @ApiOperation(value = "알림 읽음 상태 변경", notes = "알림을 읽은 상태로 변경합니다.")
    public ResponseEntity<BaseResponseBody> readList(
            @ApiIgnore @LoginWorker Worker worker,
            @PathVariable Long notificationId
    ) {
        workerService.validateWorkerWithNotification(worker, notificationId);
        notificationService.readNotification(notificationId);
        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(200, "Success"));
    }

    // 알림 삭제
    @DeleteMapping("/{notificationId}")
    @ApiOperation(value = "알림 삭제", notes = "알림 삭제합니다.")
    public ResponseEntity<BaseResponseBody> delete(
            @ApiIgnore @LoginWorker Worker worker,
            @PathVariable Long notificationId
    ) {
        workerService.validateWorkerWithNotification(worker, notificationId);
        notificationService.delete(notificationId);
        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(200, "Success"));
    }
}