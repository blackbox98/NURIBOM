package com.autonomous.nuribom.dto.response.medication;

import com.autonomous.nuribom.dto.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("MedicationGroupResponse")
public class MedicationGroupResponse extends BaseResponseBody {
    // 복약 시간 목록
    private List<MedicationResponse> responses;

    public static MedicationGroupResponse of(Integer statusCode, String message, List<MedicationResponse> medicationResponses) {
        MedicationGroupResponse response = new MedicationGroupResponse();
        response.setStatusCode(statusCode);
        response.setMessage(message);
        response.setResponses(medicationResponses);
        return response;
    }
}
