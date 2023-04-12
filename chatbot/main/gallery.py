import json
import sys
import os
import order
import time
sys.path.append(os.path.abspath('../nuribom_display_part_test/socket_test/chat')) # controller.py에서 테스트
import siosocket as so

def main():
    
    listen_order = order.ListenOrder()
    
    while True:
        text = listen_order.listengame()
        if text :
            if text == '' or type(text) == None:
                continue

            if '다음' in text:
                so.sendorder('next')
            elif '이전' in text:
                so.sendorder('prev')
            elif '나가' in text:
                so.sendorder('home') 
                break
            elif '이거' in text:
                so.sendorder('this')
            elif '배경' in text:
                so.sendorder('bg')
                break
            elif '응' in text:
                so.sendorder('응')
            elif '아니' in text:
                so.sendorder('아니')
            


