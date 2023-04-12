import serial
import sys
import os
sys.path.append(os.path.abspath('../nuribom_display_part_test/socket_test/chat'))
import siosocket as so

ser = serial.Serial('/dev/ttyACM1', 9600)

result = input()

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
ser.write(val)