package com.autonomous.nuribom.dto.response.carelist;

import com.autonomous.nuribom.dto.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("CareListCreateResponse")
public class CareListCreateResponse extends BaseResponseBody {
    // 담당 보호자 리스트 식별번호
    private Long id;

    public static CareListCreateResponse of(Integer statusCode, String message, Long careListId) {
        CareListCreateResponse response = new CareListCreateResponse();
        response.setStatusCode(statusCode);
        response.setMessage(message);
        response.setId(careListId);
        return response;
    }
}