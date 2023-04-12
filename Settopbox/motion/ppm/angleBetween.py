import numpy as np
import math

## p1 : 세 점 중 중간점 좌표(사이각을 구할 지점의 좌표)
## p2 : 세 점 중 시작점 좌표
## p3 : 세 점 중 끝점 좌표
## angle_vec : True -> 시계방향, False -> 반시계방향
# def get_angle(p1, p2, p3, angle_vec) :
#   rad = np.arctan2(p2[1] - p1[1], p2[0] - p1[0]) - np.arctan2(p3[1] - p1[1], p3[0] - p1[0])
#   deg = (rad * (180 / np.pi))
#   if angle_vec:
#     deg = abs(deg)
#   return deg



def get_angle(p1, p2, p3) :

  x,y,x1,y1,x2,y2 = p1[0],p1[1],p2[0],p2[1],p3[0],p3[1]

  tmp = ((x1-x)*(y2-y) - (y1-y)*(x2-x)) / ((((x1-x)**2+(y1-y)**2)**0.5) * (((x2-x)**2+(y2-y)**2)**0.5))
  if tmp>1:
    tmp=1 
  elif tmp<-1:
    tmp=-1
    
  try:
    res = math.degrees(math.asin(tmp))
  except:
    print(tmp,"========>>>>>>>")
    print(p1,"===============")
    print(p2)
    print(p3)
  return 180-res

def get_slope(p1,p2):

  x1,y1,x2,y2 = p1[0],p1[1],p2[0],p2[1]

  res = ((y2-y1)/(x2-x1))
  return res