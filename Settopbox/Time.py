import sys
import time 
import requests
import TTS as tts
import json

isCheck = False
lastDate = time.strftime("%Y-%m-%d")
serialnum = ""
medi_url = ''
notification_url = ''
medi_alarm = []
medi_check = []

def times():
    with open('env.json', 'r') as f:
        data = json.load(f)
        serialnum = data['serialno']
        medi_url = data['medi_url']
        notification_url = data['notification_url']
    f.close()
    medi_url = medi_url + serialnum
    notification_url = notification_url + serialnum
    while(True) :
        global isCheck
        global lastDate

        global medi_alarm
   
        current_date=time.strftime("%Y-%m-%d")
        current_time=time.strftime("%H:%M:%S") 
        if not isCheck :
            headers = {'Content-Type': 'application/json; charset=utf-8'}
            response = requests.get(medi_url, headers=headers)
            jsondata = response.json().get('responses')
            for i in jsondata:
                medi_alarm.append(i['medication_hour'] + ':' + i['medication_minutes'])
                medi_check.append(False)
            isCheck = True
        if not lastDate == current_date:
            isCheck = False
            lastDate = current_date
        current_hour = int(current_time.split(":")[0])
        current_min =  int(current_time.split(":")[1])
        for i in range(0, len(medi_alarm)) :
            hour = int(medi_alarm[i].split(":")[0])
            min = int(medi_alarm[i].split(":")[1])
            if not medi_check[i] and hour == current_hour and current_min >= min:
                tts.speak("어르신 약 드실 시간이예요!")
                medi_check[i] = True
        time.sleep(1)

def checkHi():
    global isCheck
    if not isCheck:
        if int(time.strftime("%H")) < 11:
            tts.speak("안녕히 주무셨어요? 무엇을 도와드릴까요?")
            isCheck = True
        else :
            tts.speak("안녕하세요 어르신 무엇을 도와드릴까요?")
            isCheck = True

        headers = {'Content-Type': 'application/json', 'charset': 'UTF-8', 'Accept': '*/*'}
        data = {
            "notificationType": "FIRST_MOVE"
        }
        try:
            requests.post(url, headers=headers, data=json.dumps(data))
        except Exception as e:
            print(e)
    else :
        isCheck = True

if __name__ == "__main__":
    times()
