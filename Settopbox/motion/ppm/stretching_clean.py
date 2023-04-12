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

import argparse
import collections
from functools import partial
import time
import os

import svgwrite
import gstreamer
from gi.repository import Gtk

from pose_engine import PoseEngine
from pose_engine import KeypointType

from angleBetween import get_angle, get_slope

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

def run(inf_callback, render_callback):
    parser = argparse.ArgumentParser(formatter_class=argparse.ArgumentDefaultsHelpFormatter)
    parser.add_argument('--mirror', help='flip video horizontally', action='store_true')
    parser.add_argument('--model', help='.tflite model path.', required=False)
    parser.add_argument('--res', help='Resolution', default='640x480',
                        choices=['480x360', '640x480', '1280x720'])
    parser.add_argument('--videosrc', help='Which video source to use', default='/dev/video0')
    parser.add_argument('--h264', help='Use video/x-h264 input', action='store_true')
    parser.add_argument('--jpeg', help='Use image/jpeg input', action='store_true')
    args = parser.parse_args()

    default_model = 'models/mobilenet/posenet_mobilenet_v1_075_%d_%d_quant_decoder_edgetpu.tflite'
    if args.res == '480x360':
        src_size = (640, 480)
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

    gstreamer.run_pipeline(partial(inf_callback, engine), partial(render_callback, engine),
                           src_size, inference_size,
                           mirror=args.mirror,
                           videosrc=args.videosrc,
                           h264=args.h264,
                           jpeg=args.jpeg
                           )

# when start function main manipulate only one time
def main():
    fps_counter = avg_fps_counter(30)
    cnt = 0
    reference_pose = {
        "twist": [[100, 100, 170, 170],[100, 120, 190, 140],[100, 100, 170, 170],[120, 100, 140, 190],[100, 100, 170, 170]], # 골반 잡고 돌리기 - 허리 스트레칭
        "onehand": [[0, 170, 170],[-1, 190, 140],[0, 170, 170],[1, 140, 190],[0, 170, 170]], #  한 팔 위로 들기 - 어깨, 옆구리 스트레칭
        "neck": [[0],[1],[0],[-1],[0]], # 양쪽으로 머리 당겨주기 - 목 트레칭
        "arms": [[270, 270, 180, 180],[220, 220, 180, 180],[180, 180, 180, 180],[110, 110, 180, 180],[180, 180, 180, 180],[220, 220, 180, 180],[270, 270, 180, 180]], # 양 팔 위아래로 움직이기 - 팔 스트레칭
        "finish": "finish"
    }
    
    part_num = 4
    category = 3
    fail_cnt = 0
    repeat_cnt = 1
    
    def run_inference(engine, input_tensor):
        return engine.run_inference(input_tensor)

    def render_overlay(engine, output, src_size, inference_box):
        nonlocal fps_counter, cnt, reference_pose, part_num,category, fail_cnt, category, repeat_cnt
        print("render_overlay>>>>>>>>>>>>>>>>>>>>>>>>")
        
        svg_canvas = svgwrite.Drawing('', size=src_size)
        outputs, inference_time = engine.ParseOutput()

        margin_error = 20

        name = list(reference_pose.keys())[category]


        shadow_text(svg_canvas, 10, 20, name)
        

        # we have to seperate below two sentence. if use on same line, hence second condition, PC will simulate 'else' paragraph!!

        # outputs is count of person !!
        for pose in outputs:
            # if you wanna see person pose line. Use below line
            draw_pose(svg_canvas, pose, src_size, inference_box)

            cnt+=1
            # ============ set compare time!! ==============
            if cnt>=int(next(fps_counter) * 0.2):
                cnt=0
                pass_pose = True
                current_pose = [[p.point[0], p.point[1]] for p in pose.keypoints.values()]
                
                # If you want to see all parts of body use below sentence!!
                # print('  %-20s x=%-4d y=%-4d score=%.1f' %(label.name, keypoint.point[0], keypoint.point[1], keypoint.score))

                # TrueFPS is how many get info every 1's!!
    
                angle_left_shoulder = get_angle(current_pose[5], current_pose[6], current_pose[7])
                angle_right_shoulder = get_angle(current_pose[6], current_pose[8], current_pose[5])
                angle_left_elbow = get_angle(current_pose[7], current_pose[9], current_pose[5])
                angle_right_elbow = 360-get_angle(current_pose[8], current_pose[10], current_pose[6])
                angle_left_hip = get_angle(current_pose[11], current_pose[13], current_pose[12])
                angle_right_hip = get_angle(current_pose[12], current_pose[11], current_pose[14])
                angle_left_waist = get_angle(current_pose[11], current_pose[5], current_pose[13])
                angle_right_waist = 360-get_angle(current_pose[12], current_pose[6], current_pose[14])
                slope_eyes = get_slope(current_pose[1],current_pose[2])
                slope_shoulder = get_slope(current_pose[5],current_pose[6])

                print('angle_left_shoulder : ', angle_left_shoulder)
                print('angle_right_shoulder : ', angle_right_shoulder)
                print('angle_left_elbow : ', angle_left_elbow)
                print('angle_right_elbow : ', angle_right_elbow)
                print('angle_left_hip : ', angle_left_hip)
                print('angle_right_hip : ', angle_right_hip)
                print('angle_left_waist : ', angle_left_waist)
                print('angle_right_waist : ', angle_right_waist)
                print('slope_eyes : ', slope_eyes)
                print('slope_shoulder : ', slope_shoulder)
                
                if name == "twist":
                    angles = [angle_left_elbow,angle_right_elbow,angle_left_waist,angle_right_waist]
                    for i in range(4):
                        if abs(reference_pose[name][part_num][i] - angles[i]) > margin_error:
                            pass_pose = False
                
                elif name == "onehand":
                    angles = [slope_shoulder,angle_left_waist,angle_right_waist]              
                    for i in range(3):
                        margin_error = 20 if i!=0 else 0.2
                        if abs(reference_pose[name][part_num][i] - angles[i]) > margin_error:
                            pass_pose = False

                elif name == "neck":
                    margin_error = 0.2
                    if abs(reference_pose[name][part_num][0] - slope_eyes) > margin_error:
                        pass_pose = False

                elif name == "arms":
                    angles = [angle_left_shoulder,angle_right_shoulder,angle_left_elbow,angle_right_elbow]
                    for i in range(4):
                        if abs(reference_pose[name][part_num][i] - angles[i]) > margin_error:
                            pass_pose = False
                else :
                    Gtk.main_quit()
                    # quit()

                ## check result
                if pass_pose :
                    print(part_num,"============================ 통과!!!!! ============================")
                    part_num += 1
                    if part_num == len(reference_pose[name]) and repeat_cnt < 2:
                        part_num=0
                        repeat_cnt += 1
                    elif part_num == len(reference_pose[name]) and repeat_cnt == 2:
                        part_num=0
                        repeat_cnt = 1
                        category += 1
                else :
                    print(part_num,"============================ 실패!!!!! ============================")
                    fail_cnt+=1
                    if fail_cnt == 5 : #25
                        fail_cnt = 0
                        part_num += 1
                        if part_num == len(reference_pose[name]) and repeat_cnt < 2:
                            part_num=0
                            repeat_cnt += 1
                            gstreamer.stop_pipeline()

                        elif part_num == len(reference_pose[name]) and repeat_cnt == 2:
                            part_num=0
                            repeat_cnt = 1
                            category += 1

        return (svg_canvas.tostring(), False)

    run(run_inference, render_overlay)

if __name__ == '__main__':
    main()