# Copyright 2019 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
# from face_recognition import analysis
import argparse
import collections
from functools import partial
import re
import time
import threading
import serial
import os
import sys
import numpy as np
from PIL import Image
import svgwrite
import gstreamer
from gi.repository import Gtk
import pyautogui
import requests
import json

from pose_engine import PoseEngine
from pose_engine import KeypointType

from stretching_function import stretching
from angleBetween import get_angle, get_slope

sys.path.append(os.path.abspath('../chatbot/main')) # controller.py에서 테스트
# sys.path.append(os.path.abspath('../../../chatbot/main')) # total.py에서 테스트
import emergency_ask as ea
import socket_request as sr
from multiprocessing import Process, Pipe ,Manager

pipedata = ''
result = ''

EDGES = (
    (KeypointType.NOSE, KeypointType.LEFT_EYE),
    (KeypointType.NOSE, KeypointType.RIGHT_EYE),
    (KeypointType.NOSE, KeypointType.LEFT_EAR),
    (KeypointType.NOSE, KeypointType.RIGHT_EAR),
    (KeypointType.LEFT_EAR, KeypointType.LEFT_EYE),
    (KeypointType.RIGHT_EAR, KeypointType.RIGHT_EYE),
    (KeypointType.LEFT_EYE, KeypointType.RIGHT_EYE),
    (KeypointType.LEFT_SHOULDER, KeypointType.RIGHT_SHOULDER),
    (KeypointType.LEFT_SHOULDER, KeypointType.LEFT_ELBOW),
    (KeypointType.LEFT_SHOULDER, KeypointType.LEFT_HIP),
    (KeypointType.RIGHT_SHOULDER, KeypointType.RIGHT_ELBOW),
    (KeypointType.RIGHT_SHOULDER, KeypointType.RIGHT_HIP),
    (KeypointType.LEFT_ELBOW, KeypointType.LEFT_WRIST),
    (KeypointType.RIGHT_ELBOW, KeypointType.RIGHT_WRIST),
    (KeypointType.LEFT_HIP, KeypointType.RIGHT_HIP),
    (KeypointType.LEFT_HIP, KeypointType.LEFT_KNEE),
    (KeypointType.RIGHT_HIP, KeypointType.RIGHT_KNEE),
    (KeypointType.LEFT_KNEE, KeypointType.LEFT_ANKLE),
    (KeypointType.RIGHT_KNEE, KeypointType.RIGHT_ANKLE),
)

# ser = serial.Serial('/dev/ttyACM0', 9600)

def shadow_text(dwg, x, y, text, font_size=16):
    dwg.add(dwg.text(text, insert=(x + 1, y + 1), fill='black',
            font_size=font_size, style='font-family:sans-serif'))
    dwg.add(dwg.text(text, insert=(x, y), fill='white',
            font_size=font_size, style='font-family:sans-serif'))

def draw_pose(dwg, pose, src_size, inference_box, color='yellow', threshold=0.2):
    box_x, box_y, box_w, box_h = inference_box
    scale_x, scale_y = src_size[0] / box_w, src_size[1] / box_h
    xys = {}
    for label, keypoint in pose.keypoints.items():
        if keypoint.score < threshold: continue
        # Offset and scale to source coordinate space.
        kp_x = int((keypoint.point[0] - box_x) * scale_x)
        kp_y = int((keypoint.point[1] - box_y) * scale_y)

        xys[label] = (kp_x, kp_y)
        dwg.add(dwg.circle(center=(int(kp_x), int(kp_y)), r=5,
            fill='cyan', fill_opacity=keypoint.score, stroke=color))

    for a, b in EDGES:
        if a not in xys or b not in xys: continue
        ax, ay = xys[a]
        bx, by = xys[b]
        dwg.add(dwg.line(start=(ax, ay), end=(bx, by), stroke=color, stroke_width=2))

def avg_fps_counter(window_size):
    window = collections.deque(maxlen=window_size)
    prev = time.monotonic()
    yield 0.0  # First fps value.

    while True:
        curr = time.monotonic()
        window.append(curr - prev)
        prev = curr
        yield len(window) / sum(window)

def run(inf_callback, render_callback, is_letter):
    parser = argparse.ArgumentParser(formatter_class=argparse.ArgumentDefaultsHelpFormatter)
    parser.add_argument('--mirror', help='flip video horizontally', action='store_true')
    parser.add_argument('--model', help='.tflite model path.', required=False)
    parser.add_argument('--res', help='Resolution', default='640x480', choices=['480x360', '640x480', '1280x720'])
    parser.add_argument('--videosrc', help='Which video source to use', default='/dev/video0')
    parser.add_argument('--h264', help='Use video/x-h264 input', action='store_true')
    parser.add_argument('--jpeg', help='Use image/jpeg input', action='store_true')

    args = parser.parse_args()

    default_model = 'models/mobilenet/posenet_mobilenet_v1_075_%d_%d_quant_decoder_edgetpu.tflite'
    if args.res == '480x360':
        src_size = (480, 360)
        appsink_size = (480, 360)
        model = args.model or default_model % (353, 481)
    elif args.res == '640x480':
        src_size = (640, 480)
        appsink_size = (640, 480)
        model = args.model or default_model % (481, 641)
    elif args.res == '1280x720':
        src_size = (1280, 720)
        appsink_size = (1280, 720)
        model = args.model or default_model % (721, 1281)

    print('Loading model: ', model)
    engine = PoseEngine(model)
    input_shape = engine.get_input_tensor_shape()
    inference_size = (input_shape[2], input_shape[1])

    gstreamer.run_pipeline(
        partial(inf_callback, engine),
        partial(render_callback, engine),
        src_size, inference_size,
        mirror=args.mirror,
        videosrc=args.videosrc,
        h264=args.h264,
        jpeg=args.jpeg,
        is_letter = is_letter)

# def whenquit(pipe,return_dict):
#     data = pipe.recv()
#     return_dict = data

    


# 카메라가 켜지면 메인 함수는 한번만 실행됩니다~
def main(pipe, start_stretch=False,is_letter=False):
    # manager = Manager()
    # return_dict = manager.dict()
    
    
    reference_pose = {
        "arms": [[270, 270, 180, 180],[180, 180, 180, 180],[90, 90, 180, 180],[180, 180, 180, 180],[270, 270, 180, 180]], # 양 팔 위아래로 움직이기 - 팔 스트레칭
        "neck": [[0],[1],[0],[-1],[0]], # 양쪽으로 머리 당겨주기 - 목 트레칭
        "twist": [[100, 100, 170, 170],[100, 120, 190, 140],[100, 100, 170, 170],[120, 100, 140, 190],[100, 100, 170, 170]], # 골반 잡고 돌리기 - 허리 스트레칭
        "onehand": [[0, 170, 170],[-1, 190, 140],[0, 170, 170],[1, 140, 190],[0, 170, 170]], #  한 팔 위로 들기 - 어깨, 옆구리 스트레칭
        "finish": "finish"
    }
    sms_url = ""
    notification_url = ""

    with open('./env.json', 'r') as f: # controller.py에서 테스트
    # with open('../../env.json', 'r') as f: # totlal.py에서
        data = json.load(f)
        serialno = data['serialno']
        sms_url = data['sms_url'] + serialno
        notification_url = data['notification_url'] + serialno
    f.close()
    n = 0
    sum_process_time = 0
    sum_inference_time = 0
    fps_counter = avg_fps_counter(30)
    cnt = 0
    before_nose = 0
    timer_time = time.monotonic()
    BACKGROUND_DELAY = 5
    move_camera = False
    turn_cnt = 0
    eask = ea.emergencyAsk()
    # sad_cnt = 0
    # emotions = {"Good":0,"Normal":0,"Bad":0}
    
    part_num = 0
    category = 0
    pass_check = False
    pass_cnt = 0
    repeat_cnt = 1
    body = 0
    time_cnt = 0
    
    # gstreamer로 뽑아낸 값을 opencv 형식으로 바꿔서 감정분석을 진행합니다.
    def run_inference(engine, input_tensor):
        # nonlocal sad_cnt, emotions
        # numpy_frame = np.ndarray(
        #     shape=(481, 641, 3),
        #     dtype=np.uint8,
        #     buffer=input_tensor
        # )
        # emotion_res = analysis(input_data=numpy_frame)
        # if emotion_res:
        #     if emotion_res == "Neutral":
        #         emotions["Normal"] += 1
        #     elif emotion_res == "Happy":
        #         emotions["Good"] += 1
        #     else:
        #         sad_cnt += 1
        #         emotions["Bad"] += 1

        #     # 카메라가 꺼져도 sad_cnt가 지워지지 않도록 바깥 변수로 지정해야할듯? 
        #     print(sad_cnt)
        #     if sad_cnt == 100:
        #         print("야 나 운다")
        #         print(emotions)
        #         time.sleep(100)    

        return engine.run_inference(input_tensor)

    def sms_api(url):
        headers = {'Content-Type': 'application/json', 'charset': 'UTF-8', 'Accept': '*/*'}
        try:
            requests.post(url, headers=headers)
        except Exception as e:
            print(e)

    def notification_api(url):
        headers = {'Content-Type': 'application/json', 'charset': 'UTF-8', 'Accept': '*/*'}
        data = {
            "notificationType": "EMERGENCY"
        }
        try:
            requests.post(url, headers=headers, data=json.dumps(data))
        except Exception as e:
            print(e)

    def render_overlay(engine, output, src_size, inference_box):
        nonlocal sms_url, notification_url, n, sum_process_time, sum_inference_time, fps_counter, cnt, before_nose, timer_time, move_camera, turn_cnt
        nonlocal category, part_num, repeat_cnt, start_stretch, pass_check, pass_cnt, reference_pose, body, time_cnt
        global pipedata
        # listenpipe = Process(target=whenquit, args=(pipe,return_dict))
        # if start_stretch==False and is_letter==False:
        #     listenpipe.start()
        

        svg_canvas = svgwrite.Drawing('', size=src_size)
        start_time = time.monotonic()
        outputs, inference_time = engine.ParseOutput()
        end_time = time.monotonic()
        n += 1
        sum_process_time += 1000 * (end_time - start_time)
        sum_inference_time += inference_time * 1000

        avg_inference_time = sum_inference_time / n
        text_line = 'PoseNet: %.1fms (%.2f fps) TrueFPS: %.2f Nposes %d' % (
            avg_inference_time, 1000 / avg_inference_time, next(fps_counter), len(outputs)
        )

        name = list(reference_pose.keys())[category]
        # shadow_text(svg_canvas, 10, 20, text_line)
        shadow_text(svg_canvas, 10, 20, name)

        # we have to seperate below two sentence. if use on same line, hence second condition, PC will simulate 'else' paragraph!!
        if not outputs and not move_camera:
            if start_time > timer_time + BACKGROUND_DELAY:  # frame still has people in it, restart timer
                move_camera = True
                turn_cnt = 0
                val = 'o'
                val = val.encode('utf-8')
                # ser.write(val)
                time.sleep(2)
                print("Camera Turn Off!!!!!!!!!!!!!")
                gstreamer.stop_pipeline()                           
                print("============Camera Turn Start==============")
                quit()
            else:
                print("Not YET!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")

            # 결과값도 없는데, move_camera 값이 True 일 때, == 사람이 사라진지 5초가 지나서 이제 카메라를 옮겨야한다는 뜻
        # elif not outputs and move_camera:
        #     if 0 <= turn_cnt <= 3:
        #         val = 'l'
        #         val = val.encode('utf-8')
        #         ser.write(val)
        #         turn_cnt += 1
        #         time.sleep(2)

        #     elif turn_cnt<-4:
        #         val = 'o'
        #         val = val.encode('utf-8')
        #         ser.write(val)
        #         time.sleep(2)
        #         print("Camera Turn Off!!!!!!!!!!!!!")
        #         gstreamer.stop_pipeline()
        #         print("꺼졌니")

        #     elif turn_cnt<0:
        #         val = 'r'
        #         val = val.encode('utf-8')
        #         ser.write(val)
        #         turn_cnt -= 1
        #         time.sleep(2)

        #     else:
        #         val = 'o'
        #         val = val.encode('utf-8')
        #         ser.write(val)
        #         time.sleep(2)
        #         turn_cnt = -1

        else:
            move_camera = False
            timer_time = start_time
            # outputs is count of person !!
            for pose in outputs:
                draw_pose(svg_canvas, pose, src_size, inference_box)
                cnt+=1
                
                # ============ set compare time!! ==============
                if cnt>=int(next(fps_counter) * 0.2):
                    NOSE_Y = 0
                    SHOULDER = 0
                    HIP = 0
                    falling = 0
                    cnt = 0
                    shoulder_score = 0
                    hip_score = 0
                    time_cnt += 1
                    
                    # If you want to see all parts of body use below sentence!!
                    # print('  %-20s x=%-4d y=%-4d score=%.1f' %(label.name, keypoint.point[0], keypoint.point[1], keypoint.score))

                    # TrueFPS is how many get info every 1's!!
                    for label, keypoint in pose.keypoints.items():
                        if label.name == 'NOSE' and keypoint.score > 0.3:
                            NOSE_Y = keypoint.point[1]
                            if (before_nose == 0):
                                before_nose = NOSE_Y
                        elif (label.name == 'LEFT_SHOULDER') and keypoint.score > 0.3:
                            shoulder_score = keypoint.score
                            SHOULDER = keypoint.point[1]
                        elif (label.name == 'RIGHT_SHOULDER') and keypoint.score > 0.3:
                            if keypoint.score > shoulder_score:
                                SHOULDER = keypoint.point[1]
                                # print("RIGHT SHOULDER!!!!!!!")
                            # else:
                            #     print("LEFT SHOULDER!!!!!!!")

                        elif (label.name == 'LEFT_HIP') and keypoint.score > 0.3:
                            print("LEFT_HIP : ", keypoint.score)
                            hip_score = keypoint.score
                            HIP = keypoint.point[1]
                        elif (label.name == 'RIGHT_HIP') and keypoint.score > 0.3:
                            print("RIGHT_HIP : ", keypoint.score)
                            if keypoint.score > hip_score:
                                HIP = keypoint.point[1]
                                # print("RIGHT HIP!!!!!!!")
                            # else:
                            #     print("LEFT HIP!!!!!!!")

                    # 낙차 : 현재 코의 Y좌표 - 이전 코의 Y좌표
                    falling = NOSE_Y - before_nose
                    
                    if 0 < SHOULDER < 480 and SHOULDER < HIP < 480:
                        body = (HIP-SHOULDER) * 0.8 # 낙상 감지를 위한 기준 조절 : (엉덩이 좌표 - 어깨의 좌표)의 80% -> 테스트 필요

                    if body != 0 and body <= falling:
                        print("===================== fallDown =======================")
                        if eask.ask() == "help":
                            sms_api(sms_url)
                            notification_api(notification_url)
                            # 긴급상황 페이지 이동
                            sr.socketRequest('emergency')

                    before_nose = NOSE_Y

                    ####################################### 스트레칭 로직 #######################################
                    # 만약 start_stretch가 True면 스트레칭 로직을 실행합니다.
                    if start_stretch:
                        plus_part_num, ckech_pass_check, plus_pass_cnt, plus_repeat_cnt,category,time_cnt,keep = stretching(pose,name,part_num,20,pass_check,pass_cnt,repeat_cnt,category, time_cnt)

                        if keep :
                            part_num = plus_part_num
                            if time_cnt == 0:
                                pass_check = False
                            else:
                                pass_check = ckech_pass_check
                            pass_cnt = plus_pass_cnt
                            repeat_cnt = plus_repeat_cnt
                            category = category
                            time_cnt = time_cnt
                        else:
                            start_stretch = False
        
        
        # listenpipe.join()
        # pipedata =return_dict.values()
    
  
        # if pipedata == 'stretching' or pipedata == 'letter' or pipedata == 'home' :
        #     global result
        #     print(pipedata)
        #     result = pipedata
        #     pipedata = ''
        #     print(result)
        #     gstreamer.stop_pipeline()                           
        #     quit()
        return (svg_canvas.tostring(), False)

    run(run_inference, render_overlay, is_letter)
    print("끝나냐?" + result)
   
    return result
    

if __name__ == '__main__':
    # 편지 쓰면 is_letter 에 True 넣어서 main 함수 실행
    # 편지 다 썼으면 main 종료하고 is_letter에 False 넣어서 main 함수 실행
    main()
