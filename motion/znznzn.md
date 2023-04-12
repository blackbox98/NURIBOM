        if not outputs and not move_camera:
            if start_time > timer_time + BACKGROUND_DELAY:  # frame still has people in it, restart timer
                move_camera = True
                ser.write("o")
                print("============Camera Turn Start==============")
            else:
                print("Not YET!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        
        # 결과값도 없는데, move_camera 값이 True 일 때, == 사람이 사라진지 5초가 지나서 이제 카메라를 옮겨야한다는 뜻
        elif not outputs and move_camera:
            if 0 <= turn_cnt <= 3:
                ser.write("l")
                turn_cnt += 1
                time.sleep(2)
            
            elif turn_cnt<-4:
                print("Camera Turn Off!!!!!!!!!!!!!")
                quit()

            elif turn_cnt<0:``
                ser.write("r")
                turn_cnt -= 1
                time.sleep(2)

            else:
                ser.write("o")
                time.sleep(3)
                turn_cnt = -1


        else:
            move_camera = False
