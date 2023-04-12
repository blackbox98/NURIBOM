## 챗봇 api 요청을 통해 받아온 결과를 소켓 통신을 통해 프론트에 전달할 예정
from chatbot import chatbot_api
import sys
import os
sys.path.append(os.path.abspath('../nuribom_display_part_test/socket_test/chat')) # controller.py에서 테스트
# sys.path.append(os.path.abspath('../../../nuribom_display_part_test/socket_test/chat')) # total.py에서 테스트
import siosocket as so
import serial
import json
import multiprocessing as mp
import chosung
import gallery
import time
# ser = serial.Serial('/dev/ttyACM1', 9600)

class Watcher:
    """ variable을 감시하는 간단한 클래스 """
    def __init__(self, value):
        self.variable = value
    
    def set_value(self, new_value):
        self.variable = new_value
    
    def push(self):
        return self.variable

current_page = 'main'
watcher = Watcher(current_page)


def for_total():
    result = watcher.push()
    print("함수" + result)
    return result

def socketRequest(order):
    serialno = ''
    global current_page

    with open('./env.json', 'r') as f: # controller.py에서 테스트
    # with open('../../env.json', 'r') as f: # total.py에서 테스트
        data = json.load(f)
        serialno = data['serialno']

    f.close()

    api = chatbot_api.ChatbotMessageSender()
    result = api.req_message_send(order)
    no_socket = ['tvon','tvoff', 'volumeup', 'volumedown', 'nuribom']
    print("-------------------요청 결과-------------------------------")
    #이제 이걸로 소켓 요청 보내면 됨
    if result in no_socket:
        val = ''
        print("리모컨 요청 : "+result)
        if result == 'tvon':
            val = 'on'
            val = val.encode('utf-8')
        elif result == 'tvoff':
            val = 'on'
            val = val.encode('utf-8')
        elif result == 'volumeup':
            val = 'vup'
            val = val.encode('utf-8')
        elif result == 'volumedown':
            val = 'vdown'
            val = val.encode('utf-8')
        elif result == 'nuribom':
            so.sendorder('home')
        # ser.write(val)
    elif result == 'fail':
        so.sendorder(order)
    elif result == 'picture' or result == 'video':
        print("소켓 요청 : "+result + '_' + serialno)
        so.sendorder(result + '_' + serialno)
        watcher.set_value(result)
        time.sleep(6)
        gallery.main()
    elif result == 'stretching':
        print("소켓 요청 : "+result)
        print(result)
        so.sendorder(result)
        watcher.set_value(result)
        
    elif result == 'letter':
        print("소켓 요청 : "+result)
        print(result)
        so.sendorder(result)
        watcher.set_value(result)
    
    elif result == 'game':
        print("소켓 요청 : "+result)
        print(result)
        so.sendorder(result)
        time.sleep(6)
        watcher.set_value(result)
        chosung.main()
   
    else:  # [music, emergency, ...]
        print("소켓 요청 : "+result)
        print(result)
        so.sendorder(result)
        watcher.set_value(result)



        
    print("바뀐데이터" + watcher.push())
    print("----------------------------------------------------------")
    return watcher.push()