from angleBetween import get_angle, get_slope
import gstreamer
from gi.repository import Gtk
import TTS as tts
import sys
import os
sys.path.append(os.path.abspath('../chatbot/main')) # controller.py에서 테스트
# sys.path.append(os.path.abspath('../../../chatbot/main')) # total.py에서 테스트

reference_pose = {
    "arms": [[270, 270, 180, 180],[180, 180, 180, 180],[90, 90, 180, 180],[180, 180, 180, 180],[270, 270, 180, 180]], # 양 팔 위아래로 움직이기 - 팔 스트레칭
    "neck": [[0],[1],[0],[-1],[0]], # 양쪽으로 머리 당겨주기 - 목 트레칭
    "twist": [[100, 100, 170, 170],[100, 120, 190, 140],[100, 100, 170, 170],[120, 100, 140, 190],[100, 100, 170, 170]], # 골반 잡고 돌리기 - 허리 스트레칭
    "onehand": [[0, 170, 170],[-1, 190, 140],[0, 170, 170],[1, 140, 190],[0, 170, 170]], #  한 팔 위로 들기 - 어깨, 옆구리 스트레칭
    "finish": "finish"
}

def stretching(pose,name,part_num,margin_error,pass_check,pass_cnt,repeat_cnt,category, time_cnt):
    part_num = part_num
    pass_check = pass_check
    pass_cnt = pass_cnt
    repeat_cnt = repeat_cnt
    category = category
    time_cnt = time_cnt
    pass_pose = True
    current_pose = [[p.point[0], p.point[1]] for p in pose.keypoints.values()]

    # If you want to see all parts of body use below sentence!!
    # print('  %-20s x=%-4d y=%-4d score=%.1f' %(label.name, keypoint.point[0], keypoint.point[1], keypoint.score))

    # TrueFPS is how many get info every 1's!!

    angle_left_shoulder = get_angle(current_pose[5], current_pose[6], current_pose[7])
    angle_right_shoulder = get_angle(current_pose[6], current_pose[8], current_pose[5])
    angle_left_elbow = get_angle(current_pose[7], current_pose[9], current_pose[5])
    angle_right_elbow = 360-get_angle(current_pose[8], current_pose[10], current_pose[6])
    angle_left_waist = get_angle(current_pose[11], current_pose[5], current_pose[13])
    angle_right_waist = 360-get_angle(current_pose[12], current_pose[6], current_pose[14])
    slope_eyes = get_slope(current_pose[1],current_pose[2])
    slope_shoulder = get_slope(current_pose[5],current_pose[6])

    # print('angle_left_shoulder : ', angle_left_shoulder)
    # print('angle_right_shoulder : ', angle_right_shoulder)
    # print('angle_left_elbow : ', angle_left_elbow)
    # print('angle_right_elbow : ', angle_right_elbow)
    # print('angle_left_hip : ', angle_left_hip)
    # print('angle_right_hip : ', angle_right_hip)
    # print('angle_left_waist : ', angle_left_waist)
    # print('angle_right_waist : ', angle_right_waist)
    # print('slope_eyes : ', slope_eyes)
    # print('slope_shoulder : ', slope_shoulder)

    if name == "arms":
        angles = [angle_left_shoulder,angle_right_shoulder,angle_left_elbow,angle_right_elbow]
        for i in range(4):
            if abs(reference_pose[name][part_num][i] - angles[i]) > margin_error:
                pass_pose = False

    elif name == "neck":
        margin_error = 0.2
        if abs(reference_pose[name][part_num][0] - slope_eyes) > margin_error:
            pass_pose = False

    elif name == "twist":
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

    else :
        return part_num,pass_check,pass_cnt,repeat_cnt,category,time_cnt,False

    ## check result
    if pass_pose :
        print("++++++++++++++++++++++++++++++ 통과!!!!! ++++++++++++++++++++++++++++++ :: ", name, " :: ", part_num)
        if pass_check == False :
            pass_check = True
            pass_cnt += 1

    else :
        print("------------------------------ 실패!!!!! ------------------------------ :: ", name, " :: ", part_num)

    if time_cnt == 25:
        part_num += 1
        time_cnt = 0

        if part_num == len(reference_pose[name]) and repeat_cnt < 2:
            part_num = 0
            repeat_cnt += 1
        elif part_num == len(reference_pose[name]) and repeat_cnt == 2:
            part_num=0
            repeat_cnt = 1
            category += 1

        if part_num == 3 and pass_cnt == 3:
            tts.speak("훌륭해요")
        elif part_num == 3 and pass_cnt == 2:
            tts.speak("좋아요")
        elif part_num == 3 and pass_cnt < 2:
            tts.speak("저를 보고 따라해보세요")
        elif part_num == len(reference_pose[name]) and pass_cnt == 2:
            tts.speak("훌륭해요")
        elif part_num == len(reference_pose[name]) and pass_cnt == 1:
            tts.speak("좋아요")
        elif part_num == len(reference_pose[name]) and pass_cnt == 0:
            tts.speak("저를 보고 따라해보세요")
        pass_cnt = 0

    return part_num,pass_check,pass_cnt,repeat_cnt,category,time_cnt,True

