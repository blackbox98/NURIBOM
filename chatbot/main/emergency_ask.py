import os
import speech_recognition as sr
# import socketrequest
import answer_to_question
import TTS as tts
os.environ["GOOGLE_APPLICATION_CREDENTIALS"]="/home/mbl02/바탕화면/자율/possible-fabric-367523-eb5e2cac9c31.json"

class emergencyAsk:
    def ask(self):
        tts.speak("어르신, 도움을 요청할까요?")
        valid = False # 아무 응답 없이 3번 있으면 자동 신고
        ans = answer_to_question.answer()
        for i in range(1,4):
            print(i)
            text = ans.answertext("emergency")
            if(text=="help"or text=="yes"):
                print("도와줘!!!!!!!!!!!!!")
                #도움 요청 모듈
                valid = True
                return "help"
            elif(text=="fine"):
                print("어르신 괜찮음")
                valid = True
                return "fine"
            elif(text=="None"):
                continue
                 #어르신 응답 없음 


        if(valid==False):
            print("도와줘!!!!!!!!!!!!!")
            return "help"
            #도움 요청 모듈
            
        print(text)

if __name__ == "__main__":
    eask = emergencyAsk()
    eask.ask()
    
        