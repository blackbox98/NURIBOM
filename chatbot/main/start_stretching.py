# 스트레칭 시작을 위해 물어보기 위한 
import os
import answer_to_question
import speech_recognition as sr
import TTS as tts
os.environ["GOOGLE_APPLICATION_CREDENTIALS"]="/home/mbl02/바탕화면/자율/possible-fabric-367523-eb5e2cac9c31.json"

class stretching_start_ask:
    def ask(self):
        tts.speak("어르신, 스트레칭을 시작하시려면 시작을 말씀해주세요!")
        
        for i in range(1,4):
            r = sr.Recognizer()
            with sr.Microphone() as source:
                print('지금 부터 말하는 문장은 api 요청 됨')
                audio = r.listen(source, phrase_time_limit=3) # 마이크로부터 음성 듣기
            try:
                text = r.recognize_google(audio, language='ko-KR')
                print(text)
                if(text=="시작"): #긍정문 들어오면 
                    print("체조 시작 실행")
                    break
                elif(text=="아니"):
                    tts.speak("스트레칭을 종료할게요")
                    print("돌아가기") # 돌아가기 모듈 
                    break
            except sr.UnknownValueError:
                print("인식 실패")
            except sr.RequestError as e:
                print('요청 실패 : {0}'.format(e)) #key의 오류 혹은 네트워크 단절 등
        
        
        
        # 돌아가기 모듈 



        # 챗봇 api 활용 fail --> 다시한번 말씀해주세요
        # 무응답 --> 3회 반복 응답 오면 탈출
        #
        #if text 긍정 
        #   if(contents=='music') 음악요청 소켓
        #   else 스트레칭 요청 소켓
        #else
if __name__ == "__main__":
    ask = stretching_start_ask().ask()