import os
# import speech_recognition as sr
# import socketrequest
import answer_to_question
import TTS as tts
os.environ["GOOGLE_APPLICATION_CREDENTIALS"]="/home/mbl02/바탕화면/자율/possible-fabric-367523-eb5e2cac9c31.json"

class recommendAsk:
    def ask(self, contents):
        if(contents=='stretching'):
            tts.speak("어르신, 체조 한 번 해보실래요?")
        elif(contents=='music'):
            tts.speak("어르신, 노래 한 곡 들으실래요?")
        ans = answer_to_question.answer()
        text = ans.answertext("recommend")
        if(text=="yes"):
            if(contents=='music'):
                print('음악실행')
            else:
                print('체조실행')
        else:
            print('취소')
        # 챗봇 api 활용 fail --> 다시한번 말씀해주세요
        # 무응답 --> 3회 반복 응답 오면 탈출
        #
        #if text 긍정 
        #   if(contents=='music') 음악요청 소켓
        #   else 스트레칭 요청 소켓
        #else
if __name__ == "__main__":
    rask = recommendAsk()
    rask.ask("music")