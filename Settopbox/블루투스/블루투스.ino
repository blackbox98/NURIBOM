#include <SoftwareSerial.h>
#include <IRremote.h>
#include <IRremoteInt.h>

SoftwareSerial bt(6,7);  // rxPin = 블루투스 tx Pin, txPin = rx Pin
int Send_pin = 5;

void setup() {
  Serial.begin(9600);  //시리얼 초기화
  bt.begin(9600);       //소프트웨어 시리얼 통신
  IrSender.begin(Send_pin, ENABLE_LED_FEEDBACK); // 송신기 작동 시작
  pinMode(5, OUTPUT);;
 }

void loop() {
  String str;
  if(bt.available()) {  // 블루투스쪽에서 데이터를 수신한 경우 
   str = bt.readString();
   str.trim();
   Serial.print(str);
  }
    if (str=="on") {      
    Serial.println("스위치온");  
    IrSender.sendSamsung(0x707, 0x2, 1);
    delay(40); 
   }
   else if (str=="vup"){
    IrSender.sendSamsung(0x707, 0x7, 1);
    delay(40); 
   }
   else if (str=="vdown"){
    IrSender.sendSamsung(0x707, 0xB, 1);
    delay(40); 
   }
   else if (str=="chup"){
    IrSender.sendSamsung(0x707, 0x12, 1);
    delay(40); 
   }
   else if (str=="chdown"){
    IrSender.sendSamsung(0x707, 0x10, 1);
    delay(40); 
   }
   else if (str=="source"){
    IrSender.sendSamsung(0x707, 0x1, 1);
    delay(40); 
   }
   else if (str=="up"){
    IrSender.sendSamsung(0x707, 0x60, 1);
    delay(40); 
   }
   else if (str=="down"){
    IrSender.sendSamsung(0x707, 0x61, 1);
    delay(40); 
   }
   else if (str=="left"){
    IrSender.sendSamsung(0x707, 0x65, 1);
    delay(40); 
   }
   else if (str=="right"){
    IrSender.sendSamsung(0x707, 0x62, 1);
    delay(40); 
   }
   else if (str=="enter"){
    IrSender.sendSamsung(0x707, 0x68, 1);
    delay(40); 
   }
   else if (str=="0"){
    IrSender.sendSamsung(0x707, 0x11, 1);
    delay(40); 
   }
   else if (str=="1"){
    IrSender.sendSamsung(0x707, 0x04, 1);
    delay(40); 
   }
   else if (str=="2"){
    IrSender.sendSamsung(0x707, 0x05, 1);
    delay(40); 
   }
   else if (str=="3"){
    IrSender.sendSamsung(0x707, 0x06, 1);
    delay(40); 
   }
   else if (str=="4"){
    IrSender.sendSamsung(0x707, 0x08, 1);
    delay(40); 
   }
   else if (str=="5"){
    IrSender.sendSamsung(0x707, 0x09, 1);
    delay(40); 
   }
   else if (str=="6"){
    IrSender.sendSamsung(0x707, 0x0A, 1);
    delay(40); 
   }
   else if (str=="7"){
    IrSender.sendSamsung(0x707, 0x0C, 1);
    delay(40); 
   }
   else if (str=="8"){
    IrSender.sendSamsung(0x707, 0x0D, 1);
    delay(40); 
   }
   else if (str=="9"){
    IrSender.sendSamsung(0x707, 0x0E, 1);
    delay(40); 
   }
  
  if(Serial.available()) {  // 시리얼 모니터에서 데이터를 전송한 경우
    bt.write(Serial.read());  // 전송한 데이터를 블루투스 모듈을 통해 내보낸다
  }
  
}