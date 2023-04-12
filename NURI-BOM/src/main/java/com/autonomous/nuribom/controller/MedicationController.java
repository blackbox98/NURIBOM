package com.autonomous.nuribom.controller;

import com.autonomous.nuribom.common.config.web.LoginWorker;
import com.autonomous.nuribom.domain.entity.Worker;
import com.autonomous.nuribom.dto.request.medication.MedicationCreateRequest;
import com.autonomous.nuribom.dto.request.medication.MedicationUpdateRequest;
import com.autonomous.nuribom.dto.response.BaseResponseBody;
import com.autonomous.nuribom.dto.response.medication.MedicationCreateResponse;
import com.autonomous.nuribom.dto.response.medication.MedicationDetailResponse;
import com.autonomous.nuribom.dto.response.medication.MedicationGroupResponse;
import com.autonomous.nuribom.service.MedicationService;
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
@RequestMapping("/medication")
@RequiredArgsConstructor
@Api(tags = {"복약 시간 API"})
public class MedicationController {
    private final WorkerService workerService;
    private final MedicationService medicationService;

    // 복약 시간 등록
    @PostMapping
    @ApiOperation(value = "복약 시간 등록", notes = "복약 시간을 등록합니다.")
    public ResponseEntity<MedicationCreateResponse> createMedication(
            @ApiIgnore @LoginWorker Worker worker,
            @Valid @RequestBody MedicationCreateRequest request
    ) {
        workerService.validateWorkerWithUser(worker, request.getUserId());
        Long medicationId = medicationService.createMedication(request);
        return ResponseEntity.status(HttpStatus.OK).body(MedicationCreateResponse.of(200, "Success", medicationId));
    }

    // 복약 시간 상세 조회
    @GetMapping("/{medicationId}")
    @ApiOperation(value = "복약 시간 상세 조회", notes = "복약 시간을 상세 조회합니다.")
    public ResponseEntity<MedicationDetailResponse> readMedication(
            @ApiIgnore @LoginWorker Worker worker,
            @PathVariable Long medicationId
    ) {
        workerService.validateWorkerWithMedication(worker, medicationId);
        return ResponseEntity.status(HttpStatus.OK).body(MedicationDetailResponse.of(200, "Success", medicationService.readMedication(medicationId)));
    }

    // 금일 복약 시간 목록 조회 (피보호자)
    @GetMapping("/users/{serialNo}")
    @ApiOperation(value = "금일 복약 시간 목록 조회 (피보호자)", notes = "금일 복약 시간 목록을 조회합니다.")
    public ResponseEntity<MedicationGroupResponse> readTodayMedicationList(
            @PathVariable String serialNo
    ) {
        return ResponseEntity.status(HttpStatus.OK).body(MedicationGroupResponse.of(200, "Success", medicationService.readTodayMedicationList(serialNo)));
    }

    // 담당 피보호자 복약 시간 목록 조회 (보호자)
    @GetMapping("/lists/{userId}")
    @ApiOperation(value = "담당 피보호자 복약 시간 목록 조회 (보호자)", notes = "담당 피보호자의 복약 시간 목록을 조회합니다.")
    public ResponseEntity<MedicationGroupResponse> readMedicationList(
            @ApiIgnore @LoginWorker Worker worker,
            @PathVariable Long userId
    ) {
        workerService.validateWorkerWithUser(worker, userId);
        return ResponseEntity.status(HttpStatus.OK).body(MedicationGroupResponse.of(200, "Success", medicationService.readMedicationList(userId)));
    }

    // 복약 시간 수정
    @PutMapping("/{medicationId}")
    @ApiOperation(value = "복약 시간 수정", notes = "복약 시간을 수정합니다.")
    public ResponseEntity<BaseResponseBody> updateMedication(
            @ApiIgnore @LoginWorker Worker worker,
            @PathVariable Long medicationId,
            @Valid @RequestBody MedicationUpdateRequest request
    ) {
        workerService.validateWorkerWithMedication(worker, medicationId);
        medicationService.updateMedication(medicationId, request);
        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(200, "Success"));
    }

    // 복약 시간 삭제
    @DeleteMapping("/{medicationId}")
    @ApiOperation(value = "복약 시간 삭제", notes = "복약 시간을 삭제합니다.")
    public ResponseEntity<BaseResponseBody> deleteMedication(
            @ApiIgnore @LoginWorker Worker worker,
            @PathVariable Long medicationId
    ) {
        workerService.validateWorkerWithMedication(worker, medicationId);
        medicationService.deleteMedication(medicationId);
        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(200, "Success"));
    }
}
