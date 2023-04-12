import os
import speech_recognition as sr
import socket_request
import sys
import os
import order
sys.path.append(os.path.abspath('../nuribom_display_part_test/socket_test/chat')) # controller.py에서 테스트
import siosocket as so
os.environ["GOOGLE_APPLICATION_CREDENTIALS"]="/home/mbl02/바탕화면/자율/possible-fabric-367523-eb5e2cac9c31.json"

class ListenOrder:

    def listen(self):
        r = sr.Recognizer()
        with sr.Microphone() as source:
            print('지금 부터 말하는 문장은 api 요청 됨')
            audio = r.listen(source, phrase_time_limit=5) # 마이크로부터 음성 듣기
        try:
            text = r.recognize_google(audio, language='ko-KR')
            print(text)
            result = socket_request.socketRequest(text)
            return result
        except sr.UnknownValueError:
            print("인식 실패")
        except sr.RequestError as e:
            print('요청 실패 : {0}'.format(e)) #key의 오류 혹은 네트워크 단절 등

    def listengame(self) :
        r = sr.Recognizer()
        with sr.Microphone() as source:
            print('지금 부터 말하는 문장은 api 요청 됨')
            audio = r.listen(source, phrase_time_limit=5) # 마이크로부터 음성 듣기
        try:
            text = r.recognize_google(audio, language='ko-KR')
            print(text)
            return text
        except :
            print("인식 실패")


if __name__ == "__main__":
    listner = ListenOrder()
    listner.listen()