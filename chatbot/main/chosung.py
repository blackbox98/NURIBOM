import json
import sys
import os
import order
import time
sys.path.append(os.path.abspath('../nuribom_display_part_test/socket_test/chat')) # controller.py에서 테스트
import siosocket as so

def main():
    with open('./game.json', 'r') as f: # controller.py에서 테스트
        # with open('../../env.json', 'r') as f: # total.py에서 테스트
        data = json.load(f)
        question = data['animal_list']

    f.close()
    listen_order = order.ListenOrder()
    idx = 0
    failcnt = 0
    while True:
        if failcnt == 3:
            idx += 1
            failcnt = 0
        munjae = question[idx]
        text = listen_order.listengame()
        if munjae in text:
            so.sendorder('O')
            idx += 1
            time.sleep(4)
        else :
            so.sendorder('X')
            failcnt += 1
        if len(question) == idx:
            break


