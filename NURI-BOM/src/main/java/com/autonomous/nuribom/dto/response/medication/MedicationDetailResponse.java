package com.autonomous.nuribom.dto.response.medication;

import com.autonomous.nuribom.dto.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("MedicationDetailResponse")
public class MedicationDetailResponse extends BaseResponseBody {
    // 복약 시간 식별번호
    private Long id;

    // 피보호자 ID
    private Long userId;

    // 피보호자 이름
    private String userName;

    // 약 이름
    private String medicine;

    // 복약 시간 (시)
    private String medication_hour;

    // 복약 시간 (분)
    private String medication_minutes;

    // 복약 요일
    private Boolean[] days = new Boolean[7];

    public static MedicationDetailResponse of(Integer statusCode, String message, MedicationResponse medicationResponse) {
        MedicationDetailResponse response = new MedicationDetailResponse();
        response.setStatusCode(statusCode);
        response.setMessage(message);
        response.setId(medicationResponse.getId());
        response.setUserId(medicationResponse.getUserId());
        response.setUserName(medicationResponse.getUserName());
        response.setMedicine(medicationResponse.getMedicine());
        response.setMedication_hour(medicationResponse.getMedication_hour());
        response.setMedication_minutes(medicationResponse.getMedication_minutes());
        response.setDays(medicationResponse.getDays());
        return response;
    }
}
