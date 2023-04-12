import sys
import requests
import json

class sentimentDetector:
    client_id = "0t4432bnap"
    client_secret = "E4MH6XXKzZM7JGbanjt5IrEHg8KlPTWg8sHjzmaG"
    url="https://naveropenapi.apigw.ntruss.com/sentiment-analysis/v1/analyze"
    
    def req_sentiment_detect(self, text):
        headers = {
            "X-NCP-APIGW-API-KEY-ID": self.client_id,
            "X-NCP-APIGW-API-KEY": self.client_secret,
            "Content-Type": "application/json"
        }
        content = text
        data = {
        "content": content
        }
        print(json.dumps(data, indent=4, sort_keys=True))
        response = requests.post(self.url, data=json.dumps(data), headers=headers)
        rescode = response.status_code
        if(rescode == 200):
            print (response.text)
        else:
            print("Error : " + response.text)
if __name__ == '__main__':
    res = sentimentDetector().req_sentiment_detect("c바 ㅅ랑해")
    print(res)