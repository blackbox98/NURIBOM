package com.autonomous.nuribom.controller;

import com.autonomous.nuribom.common.config.web.LoginWorker;
import com.autonomous.nuribom.domain.entity.Worker;
import com.autonomous.nuribom.dto.request.carelist.CareListRequest;
import com.autonomous.nuribom.dto.request.user.UserCreateRequest;
import com.autonomous.nuribom.dto.request.user.UserUpdateRequest;
import com.autonomous.nuribom.dto.response.BaseResponseBody;
import com.autonomous.nuribom.dto.response.carelist.CareListGroupResponse;
import com.autonomous.nuribom.dto.response.user.UserCreateResponse;
import com.autonomous.nuribom.dto.response.user.UserDetailResponse;
import com.autonomous.nuribom.service.CareListService;
import com.autonomous.nuribom.service.UserService;
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
@RequestMapping("/users")
@RequiredArgsConstructor
@Api(tags = {"피보호자 API"})
public class UserController {
    private final WorkerService workerService;
    private final UserService userService;
    private final CareListService careListService;

    // 담당 피보호자 정보 등록
    @PostMapping
    @ApiOperation(value = "담당 피보호자 정보 등록", notes = "담당 피보호자 정보를 등록합니다.")
    public ResponseEntity<UserCreateResponse> createUser(
            @ApiIgnore @LoginWorker Worker worker,
            @Valid @RequestBody UserCreateRequest request
    ) {
        workerService.validateWorker(worker);
        Long userId = userService.createUser(request);
        Long careListId = careListService.createCareList(worker.getId(), new CareListRequest(userId));
        return ResponseEntity.status(HttpStatus.OK).body(UserCreateResponse.of(200, "Success", userId, careListId));
    }

    // 담당 피보호자 정보 상세 조회
    @GetMapping("/{userId}")
    @ApiOperation(value = "담당 피보호자 정보 상세 조회", notes = "담당 피보호자의 정보를 상세 조회합니다.")
    public ResponseEntity<UserDetailResponse> readUser(
            @ApiIgnore @LoginWorker Worker worker,
            @PathVariable Long userId
    ) {
        workerService.validateWorkerWithUser(worker, userId);
        return ResponseEntity.status(HttpStatus.OK).body(UserDetailResponse.of(200, "Success", userService.readUser(userId)));
    }

    // 피보호자 본인 정보 상세 조회
    @GetMapping("serialno/{serialNo}")
    @ApiOperation(value = "피보호자 본인 정보 상세 조회", notes = "피보호자 본인의 정보를 상세 조회합니다.")
    public ResponseEntity<UserDetailResponse> readUserOwn(
            @PathVariable String serialNo
    ) {
        return ResponseEntity.status(HttpStatus.OK).body(UserDetailResponse.of(200, "Success", userService.readUserOwn(serialNo)));
    }

    // 담당 피보호자 목록 조회
    @GetMapping
    @ApiOperation(value = "담당 피보호자 목록 조회", notes = "담당 피보호자 목록을 조회합니다.")
    public ResponseEntity<CareListGroupResponse> readUserList(
            @ApiIgnore @LoginWorker Worker worker
    ) {
        workerService.validateWorker(worker);
        return ResponseEntity.status(HttpStatus.OK).body(CareListGroupResponse.of(200, "Success", careListService.readCareListByWorker(worker.getId())));
    }

    // 담당 피보호자 정보 수정
    @PutMapping("/{userId}")
    @ApiOperation(value = "담당 피보호자 정보 수정", notes = "담당 피보호자의 정보를 수정합니다.")
    public ResponseEntity<BaseResponseBody> updateUser(
            @ApiIgnore @LoginWorker Worker worker,
            @PathVariable Long userId,
            @Valid @RequestBody UserUpdateRequest request
    ) {
        workerService.validateWorkerWithUser(worker, userId);
        userService.updateUser(userId, request);
        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(200, "Success"));
    }

    // 피보호자 셋탑박스 일련번호 수정
    @PutMapping("serialno/{serialNo}")
    @ApiOperation(value = "피보호자 셋탑박스 일련번호 수정", notes = "피보호자의 셋탑박스 일련번호를 수정합니다.")
    public ResponseEntity<BaseResponseBody> updateSerialNo(
            @ApiIgnore @LoginWorker Worker worker,
            @PathVariable String serialNo
    ) {
        workerService.validateWorkerWithSerialNo(worker, serialNo);
        userService.updateSerialNo(serialNo);
        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(200, "Success"));
    }

    // 담당 피보호자 등록 해제
    @DeleteMapping("/{userId}")
    @ApiOperation(value = "담당 피보호자 등록 해제", notes = "담당 피보호자 등록을 해제합니다.")
    public ResponseEntity<BaseResponseBody> deleteUser(
            @ApiIgnore @LoginWorker Worker worker,
            @PathVariable Long userId
    ) {
        workerService.validateWorkerWithUser(worker, userId);
        userService.deleteUser(userId);
        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(200, "Success"));
    }
}
