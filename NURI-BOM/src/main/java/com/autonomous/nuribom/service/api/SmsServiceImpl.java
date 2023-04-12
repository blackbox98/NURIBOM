package com.autonomous.nuribom.service.api;

import com.autonomous.nuribom.common.exception.NotFoundException;
import com.autonomous.nuribom.domain.entity.User;
import com.autonomous.nuribom.domain.repository.UserRepository;
import com.autonomous.nuribom.dto.request.api.MessageRequest;
import com.autonomous.nuribom.dto.request.api.SmsRequest;
import com.autonomous.nuribom.dto.response.api.SmsResponse;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.UnsatisfiedDependencyException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;

import static com.autonomous.nuribom.common.exception.NotFoundException.USER_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class SmsServiceImpl implements SmsService {
    private final UserRepository userRepository;

    // 네이버 클라우드 Access Key
    @Value("${api-key.naver-cloud-sms-access-key}")
    private String accessKey;

    // 네이버 클라우드 Secret Key
    @Value("${api-key.naver-cloud-sms-secret-key}")
    private String secretKey;

    // 네이버 클라우드 SENS ServiceId
    @Value("${api-key.naver-cloud-sms-service-id}")
    private String serviceId;

    // 네이버 클라우드 SENS 발신번호
    @Value("${api-key.naver-cloud-sms-sender-phone}")
    private String senderPhone;

    // 시그니처 생성
    @Override
    public String makeSignature(Long time) throws NoSuchAlgorithmException, UnsatisfiedDependencyException, InvalidKeyException {
        String space = " ";
        String newLine = "\n";
        String method = "POST";
        String url = "/sms/v2/services/" + this.serviceId + "/messages";
        String timestamp = time.toString();
        String accessKey = this.accessKey;
        String secretKey = this.secretKey;

        String message = new StringBuilder()
                .append(method)
                .append(space)
                .append(url)
                .append(newLine)
                .append(timestamp)
                .append(newLine)
                .append(accessKey)
                .toString();

        SecretKeySpec signingKey = new SecretKeySpec(secretKey.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
        Mac mac = Mac.getInstance("HmacSHA256");
        mac.init(signingKey);

        byte[] rawHmac = mac.doFinal(message.getBytes(StandardCharsets.UTF_8));

        return Base64.encodeBase64String(rawHmac);
    }

    // 메시지 발송
    @Override
    public SmsResponse sendSms(String serialNo) throws JsonProcessingException, RestClientException, URISyntaxException, InvalidKeyException, NoSuchAlgorithmException, UnsatisfiedDependencyException {
        Long time = System.currentTimeMillis();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("x-ncp-apigw-timestamp", time.toString());
        headers.set("x-ncp-iam-access-key", accessKey);
        headers.set("x-ncp-apigw-signature-v2", makeSignature(time));

        User user = userRepository.findBySerialNo(serialNo)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        // 수신번호
        String to = user.getCareList().getWorker().getWorkerPhone();
        // 메시지 내용
        String content = user.getUserName() + "님에게 낙상 사고가 발생하였습니다! 확인이 필요합니다!";
        MessageRequest messageRequest = new MessageRequest(to, content);
        List<MessageRequest> messages = new ArrayList<>();
        messages.add(messageRequest);

        SmsRequest request = SmsRequest.builder()
                .type("SMS")
                .contentType("COMM")
                .countryCode("82")
                .from(senderPhone)
                .content(messageRequest.getContent())
                .messages(messages)
                .build();

        ObjectMapper objectMapper = new ObjectMapper();
        String body = objectMapper.writeValueAsString(request);
        HttpEntity<String> httpBody = new HttpEntity<>(body, headers);

        RestTemplate restTemplate = new RestTemplate();
        restTemplate.setRequestFactory(new HttpComponentsClientHttpRequestFactory());

        return restTemplate.postForObject(new URI("https://sens.apigw.ntruss.com/sms/v2/services/" + serviceId + "/messages"), httpBody, SmsResponse.class);
    }
}
