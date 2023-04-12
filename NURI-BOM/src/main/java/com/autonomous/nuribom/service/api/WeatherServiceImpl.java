package com.autonomous.nuribom.service.api;

import com.autonomous.nuribom.dto.request.api.WeatherRequest;
import com.autonomous.nuribom.dto.response.api.WeatherResponse;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class WeatherServiceImpl implements WeatherService {
    // 날씨 정보 API Key
    @Value("${api-key.weather-rest-api}")
    private String weatherRestApiKey;

    // 날씨 정보 조회
    @Override
    public List<WeatherResponse> getWeather(WeatherRequest request) throws IOException, ParseException {
        List<WeatherResponse> weatherResponses = new ArrayList<>();
        /*URL*/
        String urlBuilder = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst" +
                "?" + URLEncoder.encode("serviceKey", "UTF-8") + "=" + weatherRestApiKey + /*Service Key*/
                "&" + URLEncoder.encode("pageNo", "UTF-8") + "=" + URLEncoder.encode("1", "UTF-8") + /*페이지번호*/
                "&" + URLEncoder.encode("numOfRows", "UTF-8") + "=" + URLEncoder.encode("8", "UTF-8") + /*한 페이지 결과 수*/
                "&" + URLEncoder.encode("dataType", "UTF-8") + "=" + URLEncoder.encode("JSON", "UTF-8") + /*요청자료형식(XML/JSON) Default: XML*/
                "&" + URLEncoder.encode("base_date", "UTF-8") + "=" + URLEncoder.encode(request.getBase_date(), "UTF-8") + /*‘21년 6월 28일 발표*/
                "&" + URLEncoder.encode("base_time", "UTF-8") + "=" + URLEncoder.encode("0500", "UTF-8") + /*05시 발표(정시단위) */
                "&" + URLEncoder.encode("nx", "UTF-8") + "=" + URLEncoder.encode(request.getNx(), "UTF-8") + /*예보지점의 X 좌표값*/
                "&" + URLEncoder.encode("ny", "UTF-8") + "=" + URLEncoder.encode(request.getNy(), "UTF-8"); /*예보지점의 Y 좌표값*/
        URL url = new URL(urlBuilder);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-type", "application/json");
        System.out.println("Response code: " + conn.getResponseCode());
        BufferedReader rd;
        if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
            rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        } else {
            rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
        }
        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = rd.readLine()) != null) {
            sb.append(line);
        }
        rd.close();
        conn.disconnect();
        JSONParser jsonParser = new JSONParser();
        JSONObject responseJson = (JSONObject) jsonParser.parse(sb.toString());
        JSONObject response = (JSONObject) responseJson.get("response");
        JSONObject body = (JSONObject) response.get("body");
        JSONObject items = (JSONObject) body.get("items");
        JSONArray itemArr = (JSONArray) items.get("item");
        for (Object item : itemArr) {
            responseJson = (JSONObject) item;
            String category = (String) responseJson.get("category");
            if (category.equals("SKY") || category.equals("POP")) {
                String fcstValue = (String) responseJson.get("fcstValue");
                WeatherResponse weatherResponse = WeatherResponse.response(category, fcstValue);
                weatherResponses.add(weatherResponse);
            }
        }
        return weatherResponses;
    }
}
