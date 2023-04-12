package com.autonomous.nuribom.service;

import com.autonomous.nuribom.dto.request.user.UserCreateRequest;
import com.autonomous.nuribom.dto.request.user.UserUpdateRequest;
import com.autonomous.nuribom.dto.response.user.UserResponse;

public interface UserService {
    // 피보호자 정보 등록
    Long createUser(UserCreateRequest request);

    // 피보호자 정보 상세 조회
    UserResponse readUser(Long userId);

    // 피보호자 본인 정보 상세 조회
    UserResponse readUserOwn(String serialNo);

    // 피보호자 정보 수정
    void updateUser(Long userId, UserUpdateRequest request);

    // 피보호자 등록 해제
    void deleteUser(Long userId);

    // 최근 방문 일자 갱신
    void updateLastVisit(Long userId);

    // 셋탑박스 일련번호 수정
    void updateSerialNo(String serialNo);
}
