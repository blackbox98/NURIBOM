import serial
import re
import cv2
import sys
import os
import time
import Time
import numpy as np
import requests
import start
from TTS import speak
from multiprocessing import Process, Pipe
sys.path.append(os.path.abspath('./motion/ppm'))
sys.path.append(os.path.abspath('../chatbot/main'))


import background_run
import socket_request as sr
import total
from test import *

if __name__ == "__main__":
    if not os.path.isfile("./env.json"):
        start.run()
    ser = serial.Serial('/dev/ttyACM0', 9600)
    # ser2 = serial.Serial('/dev/ttyACM1', 9600)
    lastdistance = 0
    bp = True
    url = "https://k7b303.p.ssafy.io/api"
    
    timer = Process(target=Time.times)
    a_pipe, b_pipe = Pipe()
    bot = Process(target=background_run.main, args=(a_pipe,))

    timer.start()
    bot.start()
    while bp:
        if ser.readable():
            try :
                val = ser.readline()
            except :
                ser.open()
                val = ser.readline()
            distance = str(val.decode("utf-8"))
            distance = int(re.sub(r'[^0-9]', '',distance))
            if lastdistance == 0 :
                lastdistance = distance
            data = abs(lastdistance - distance)

            if data > 200:
                print("활동 감지 !!! 카메라 ON !!!")
                Time.checkHi()
                
                status = total.main(b_pipe)
                
                # print(status)
                # if status == 'stretching' :
                #     print("아아아")
                #     total.main(b_pipe,True,False)
                # elif status == 'letter' :
                #     total.main(b_pipe,False, True)
                lastdistance = 0
                ser.close()
                time.sleep(1)

            else :
                lastdistance = distance
    timer.join()
    bot.join()