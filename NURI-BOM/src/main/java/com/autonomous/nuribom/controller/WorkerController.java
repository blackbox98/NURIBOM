package com.autonomous.nuribom.controller;

import com.autonomous.nuribom.common.config.web.LoginWorker;
import com.autonomous.nuribom.domain.entity.Worker;
import com.autonomous.nuribom.dto.request.worker.*;
import com.autonomous.nuribom.dto.response.BaseResponseBody;
import com.autonomous.nuribom.dto.response.worker.WorkerCreateResponse;
import com.autonomous.nuribom.dto.response.worker.WorkerDetailResponse;
import com.autonomous.nuribom.dto.response.worker.WorkerFindIdPwdResponse;
import com.autonomous.nuribom.service.WorkerService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.validation.Valid;
import java.util.Objects;

@RestController
@RequestMapping("/workers")
@RequiredArgsConstructor
@Api(tags = {"보호자 API"})
public class WorkerController {
    private final WorkerService workerService;

    // 회원가입
    @PostMapping("/signup")
    @ApiOperation(value = "회원가입", notes = "회원가입을 진행합니다.")
    public ResponseEntity<WorkerCreateResponse> signUpWorker(
            @Valid @RequestBody WorkerCreateRequest request
    ) {
        Long workerId = workerService.createWorker(request);
        return ResponseEntity.status(HttpStatus.OK).body(WorkerCreateResponse.of(200, "Success", workerId));
    }

    // 아이디 중복 검사
    @GetMapping("/idcheck/{workerWebId}")
    @ApiOperation(value = "아이디 중복 검사", notes = "아이디 중복 검사 결과를 반환합니다.")
    public ResponseEntity<BaseResponseBody> idCheck(
            @PathVariable String workerWebId
    ) {
        if (!workerService.idCheck(workerWebId)) {
            return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(200, "Success"));
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(401, "Fail"));
        }
    }

    // 로그인
    @PostMapping("/login")
    @ApiOperation(value = "로그인", notes = "로그인을 진행합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "로그인 성공"),
            @ApiResponse(code = 404, message = "아이디 또는 비밀번호 입력 오류"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<BaseResponseBody> loginWorker(
            @Valid @RequestBody WorkerLoginRequest request
    ) {
        Integer statusCode = workerService.loginWorker(request);
        if (Objects.equals(statusCode, 200)) {
            return ResponseEntity.status(HttpStatus.OK)
                    .header(HttpHeaders.AUTHORIZATION, workerService.getAccessToken(request))
                    .body(BaseResponseBody.of(statusCode, "Success"));

        } else {
            return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(statusCode, "Fail"));
        }
    }

    // 아이디 찾기
    @PostMapping("/findid")
    @ApiOperation(value = "아이디 찾기", notes = "보호자의 이름, 전화번호를 통해 아이디를 찾습니다.")
    public ResponseEntity<WorkerFindIdPwdResponse> findId(
            @Valid @RequestBody WorkerFindIdRequest request
    ) {
        return ResponseEntity.status(HttpStatus.OK).body(WorkerFindIdPwdResponse.of(200, "Success", workerService.findIdByNameAndPhone(request.getWorkerName(), request.getWorkerPhone())));
    }

    // 비밀번호 찾기
    @PostMapping("/findpwd")
    @ApiOperation(value = "비밀번호 찾기", notes = "보호자의 웹 아이디, 이름, 전화번호를 통해 비밀번호를 찾습니다.")
    public ResponseEntity<WorkerFindIdPwdResponse> findPwd(
            @Valid @RequestBody WorkerFindPwdRequest request
    ) {
        return ResponseEntity.status(HttpStatus.OK).body(WorkerFindIdPwdResponse.of(200, "Success", workerService.findPwdByWebIdAndNameAndPhone(request.getWorkerWebId(), request.getWorkerName(), request.getWorkerPhone())));
    }

    // 비밀번호 변경
    @PutMapping("/{workerWebPwd}")
    @ApiOperation(value = "비밀번호 수정", notes = "보호자의 비밀번호를 수정합니다.")
    public ResponseEntity<HttpStatus> updateWorkerPwd(
            @ApiIgnore @LoginWorker Worker worker,
            @PathVariable String workerWebPwd
    ) {
        workerService.updateWorkerPwd(worker.getWorkerWebId(), workerWebPwd);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    // 보호자 정보 조회
    @GetMapping
    @ApiOperation(value = "보호자 정보 조회", notes = "보호자의 정보를 조회합니다.")
    public ResponseEntity<WorkerDetailResponse> readWorker(
            @ApiIgnore @LoginWorker Worker worker
    ) {
        return ResponseEntity.status(HttpStatus.OK).body(WorkerDetailResponse.of(200, "Success", workerService.readWorker(worker.getId())));
    }

    // 보호자 정보 수정
    @PutMapping
    @ApiOperation(value = "보호자 정보 수정", notes = "보호자의 정보를 수정합니다.")
    public ResponseEntity<BaseResponseBody> updateWorker(
            @ApiIgnore @LoginWorker Worker worker,
            @Valid @RequestBody WorkerUpdateRequest request
    ) {
        workerService.updateWorker(worker.getId(), request);
        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(200, "Success"));
    }

    // 회원탈퇴
    @DeleteMapping
    @ApiOperation(value = "회원 탈퇴", notes = "보호자의 정보를 삭제하고 탈퇴합니다.")
    public ResponseEntity<BaseResponseBody> deleteUser(
            @ApiIgnore @LoginWorker Worker worker
    ) {
        workerService.deleteWorker(worker.getId());
        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(200, "Success"));
    }
}
