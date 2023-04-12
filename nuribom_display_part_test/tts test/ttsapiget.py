import os
import sys
import urllib.request
import playsound

client_id = "pr6vu93m30"
client_secret = "obdR9N1cYguttim8KLTqkCnj3PKhuSU2IGTCN2qI"
encText = urllib.parse.quote("어르신! 영상편지가 도착했어요. 영상을 틀어드릴게요.")
data = "speaker=neunwoo&volume=0&speed=0&pitch=0&format=mp3&text=" + encText;
url = "https://naveropenapi.apigw.ntruss.com/tts-premium/v1/tts"
req = urllib.request.Request(url)
req.add_header("X-NCP-APIGW-API-KEY-ID",client_id)
req.add_header("X-NCP-APIGW-API-KEY",client_secret)
response = urllib.request.urlopen(req, data=data.encode('utf-8'))
rescode = response.getcode()
if(rescode==200):
    print("TTS mp3 저장")
    response_body = response.read()
    with open('1111.mp3', 'wb') as f:
        f.write(response_body)
    # print(response_body)
else:
    print("Error Code:" + rescode)

playsound.playsound('1111.mp3')