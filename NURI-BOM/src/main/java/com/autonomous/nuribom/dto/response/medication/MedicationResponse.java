package com.autonomous.nuribom.dto.response.medication;

import com.autonomous.nuribom.domain.entity.Medication;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("MedicationResponse")
public class MedicationResponse {
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

    public static MedicationResponse response(
            Medication medication
    ) {
        return new MedicationResponse(
                medication.getId(),
                medication.getUser().getId(),
                medication.getUser().getUserName(),
                medication.getMedicine(),
                medication.getMedication_hour(),
                medication.getMedication_minutes(),
                new Boolean[]{
                        medication.getSun(),
                        medication.getMon(),
                        medication.getTue(),
                        medication.getWed(),
                        medication.getThu(),
                        medication.getFri(),
                        medication.getSat()
                }
        );
    }
}
