import requests
import json

def send_api(method, base_date, nx, ny):
    API_HOST = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst"
    url = API_HOST
    headers = {'Content-Type': 'application/json', 'charset': 'UTF-8', 'Accept': '*/*'}
    params = {
        "serviceKey" : "nuh0BPELXbUkTStC9OTm9Lls5pNt57OSPLalavN784TOwPRzg9BD8YNB8CM1XYqil0HKP2KsJbIP/RmLHgVmTg==",
        "pageNo" : 1,
        "numOfRows" : 8,
        "dataType" : "JSON",
        "base_date" : base_date,
        "base_time" : "0500",
        "nx" : nx,
        "ny" : ny,
    }
    
    try:
        if method == 'GET':
            response = requests.get(url, headers=headers, params=params)
        elif method == 'POST':
            response = requests.post(url, headers=headers, data=json.dumps(body, ensure_ascii=False, indent="\t"))
        print("response status %r" % response.status_code)
        print("response text %r" % response.text)
    except Exception as ex:
        print(ex)
  

# 호출 예시

send_api("GET", "20221104", 66, 100)

# serviceKey : "nuh0BPELXbUkTStC9OTm9Lls5pNt57OSPLalavN784TOwPRzg9BD8YNB8CM1XYqil0HKP2KsJbIP/RmLHgVmTg=="
# pageNo : 8
# dataType : JSON
# base_date : {base_date}
# base_time : "0500"
# nx : {nx}
# ny : {ny}