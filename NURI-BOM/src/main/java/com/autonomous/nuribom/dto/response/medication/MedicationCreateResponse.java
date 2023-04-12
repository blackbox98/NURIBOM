package com.autonomous.nuribom.dto.response.medication;

import com.autonomous.nuribom.dto.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("MedicationCreateResponse")
public class MedicationCreateResponse extends BaseResponseBody {
    // 복약 시간 식별번호
    private Long id;

    public static MedicationCreateResponse of(Integer statusCode, String message, Long medicationId) {
        MedicationCreateResponse response = new MedicationCreateResponse();
        response.setStatusCode(statusCode);
        response.setMessage(message);
        response.setId(medicationId);
        return response;
    }
}
