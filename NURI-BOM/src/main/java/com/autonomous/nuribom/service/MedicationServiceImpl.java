package com.autonomous.nuribom.service;

import com.autonomous.nuribom.common.exception.NotFoundException;
import com.autonomous.nuribom.domain.entity.Medication;
import com.autonomous.nuribom.domain.entity.User;
import com.autonomous.nuribom.domain.repository.MedicationRepository;
import com.autonomous.nuribom.domain.repository.UserRepository;
import com.autonomous.nuribom.dto.request.medication.MedicationCreateRequest;
import com.autonomous.nuribom.dto.request.medication.MedicationUpdateRequest;
import com.autonomous.nuribom.dto.response.medication.MedicationResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

import static com.autonomous.nuribom.common.exception.NotFoundException.MEDICATION_NOT_FOUND;
import static com.autonomous.nuribom.common.exception.NotFoundException.USER_NOT_FOUND;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MedicationServiceImpl implements MedicationService {
    private final UserRepository userRepository;
    private final MedicationRepository medicationRepository;

    // 복약 시간 설정
    @Override
    @Transactional
    public Long createMedication(MedicationCreateRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        Medication medication = Medication.createMedication()
                .user(user)
                .medicine(request.getMedicine())
                .medication_hour(request.getMedication_hour())
                .medication_minutes(request.getMedication_minutes())
                .sun(request.getSun())
                .mon(request.getMon())
                .tue(request.getTue())
                .wed(request.getWed())
                .thu(request.getThu())
                .fri(request.getFri())
                .sat(request.getSat())
                .build();
        return medicationRepository.save(medication).getId();
    }

    // 복약 시간 상세 조회
    @Override
    public MedicationResponse readMedication(Long medicationId) {
        Medication medication = medicationRepository.findById(medicationId)
                .orElseThrow(() -> new NotFoundException(MEDICATION_NOT_FOUND));
        return MedicationResponse.response(medication);
    }

    // 금일 복약 시간 목록 조회 (피보호자)
    @Override
    public List<MedicationResponse> readTodayMedicationList(String serialNo) {
        User user = userRepository.findBySerialNo(serialNo)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        return UserServiceImpl.getUserTodayMedication(user, medicationRepository);
    }

    // 담당 피보호자 복약 시간 목록 조회 (보호자)
    @Override
    public List<MedicationResponse> readMedicationList(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        List<Medication> medications = medicationRepository.findByUser(user);
        List<MedicationResponse> medicationResponses = new ArrayList<>();
        if (!medications.isEmpty()) {
            List<MedicationResponse> list = new ArrayList<>();
            for (Medication medication : medications) {
                MedicationResponse response = MedicationResponse.response(medication);
                list.add(response);
            }
            medicationResponses = list;
        }
        return medicationResponses;
    }

    // 복약 시간 수정
    @Override
    @Transactional
    public void updateMedication(Long medicationId, MedicationUpdateRequest request) {
        Medication medication = medicationRepository.findById(medicationId)
                .orElseThrow(() -> new NotFoundException(MEDICATION_NOT_FOUND));
        medication.update(
                request.getMedicine(),
                request.getMedication_hour(),
                request.getMedication_minutes(),
                request.getSun(),
                request.getMon(),
                request.getTue(),
                request.getWed(),
                request.getThu(),
                request.getFri(),
                request.getSat()
        );
        medicationRepository.save(medication);
    }

    // 복약 시간 삭제
    @Override
    @Transactional
    public void deleteMedication(Long medicationId) {
        Medication medication = medicationRepository.findById(medicationId)
                .orElseThrow(() -> new NotFoundException(MEDICATION_NOT_FOUND));
        medicationRepository.delete(medication);
    }
}
