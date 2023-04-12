import os
import speech_recognition as sr
from chatbot import chatbot_api

    
# import socketrequest
os.environ["GOOGLE_APPLICATION_CREDENTIALS"]="/home/mbl02/바탕화면/자율/possible-fabric-367523-eb5e2cac9c31.json"
# /home/mbl02/바탕화면/자율/S07P31B303/nuribom_display_part_test/socket_test/chat

class answer:
    def answertext(self, situation):
        
        r = sr.Recognizer()            
        with sr.Microphone() as source:
            print('지금 부터 말하는 문장은 api 요청 됨')
            audio = r.listen(source, phrase_time_limit=3) # 마이크로부터 음성 듣기
        try:
            text = r.recognize_google(audio, language='ko-KR')
            print("인식된 문장 : "+text)
            api = chatbot_api.ChatbotMessageSender()
            result = api.req_message_send(text)
            print("결과 : "+result)
            if(situation=="recommend"):
                if(result=="positive"):
                    return "yes"
                else:
                    return "no"
            elif(situation=="emergency"):
                if(result=="positive" or result =="help"):
                    return "help"
                else:
                    return "fine"
            # socketrequest.socketRequest(text)
            return text
        except sr.UnknownValueError:
            print("인식 실패")
        except sr.RequestError as e:
            print('요청 실패 : {0}'.format(e)) #key의 오류 혹은 네트워크 단절 등

if __name__ == "__main__":
    ans  = answer().answertext("emergency")
    print(ans)