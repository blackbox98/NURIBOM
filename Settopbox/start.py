#Import the required Libraries
from tkinter import *
from tkinter import ttk
import json
import os, sys

#Create an instance of Tkinter frame
win= Tk()
win.title("시리얼 등록")
#Set the geometry of Tkinter frame
win.geometry("750x300")

frame = LabelFrame(win, text="누리봄", padx=50, pady=50)
frame.pack(padx=20, pady=20)
def display_text():
    global entry
    serialnum = entry.get()
    with open('env.json', 'w') as f:
        data = {
            "serialno" : serialnum,
            "medi_url" : "https://k7b303.p.ssafy.io/api/medication/users/",
            "sms_url": "https://k7b303.p.ssafy.io/api/sms/",
            "notification_url" : "https://k7b303.p.ssafy.io/api/notification/"
        }
        json.dump(data, f)
    f.close()
    win.destroy()

#Initialize a Label to display the User Input
label=Label(win, text="누리봄 셋톱박스 시리얼 번호", font=("Courier 22 bold"), height=3)
label.pack()

#Create an Entry widget to accept User Input
entry= Entry(win, width= 40)
entry.focus_set()
entry.pack()

#Create a Button to validate Entry Widget
ttk.Button(win, text= "등록",width= 20, command= display_text).pack(pady=20)

def run():
    win.mainloop()

if __name__ == "__main__":
    run()