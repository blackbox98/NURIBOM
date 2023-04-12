#include <Servo.h>
int trigPin = 12; // 초음파센서 출력핀
int echoPin = 11; // 초음파센서 입력핀
int led = 13;     // LED 핀
Servo myservo;  // create servo object to control a servo
// twelve servo objects can be created on most boards
int angle = 90;
void setup(){  
  Serial.begin(9600);       // 시리얼 속도 설정
  pinMode(trigPin, OUTPUT);  // 트리거 핀을 출력으로 설정
  pinMode(echoPin, INPUT);   // 데코 핀을 입력으로 설정
  pinMode(led, OUTPUT);      // LED 핀을 출력으로 설정
  myservo.attach(3);  // attaches the servo on pin 9 to the servo object
}

void loop(){  
  if (Serial.available()){ // Serial.available()는 아두이노가 받은 데이터가 있는지 확인하는 명령어.
    delay(30);
    char c = Serial.read();
    Serial.print(c);
    if (c == 'l') {
      for (int pos = 0; pos <= 30; pos++) { // goes from 0 degrees to 180 degrees
      angle = angle + 1;
      if (angle >= 180) {
        angle = 180;
      }
      myservo.write(angle);              // tell servo to go to position in variable 'pos'
      delay(20);                       // waits 15ms for the servo to reach the position
    }
    }
    else if (c == 'r') {
      for (int pos = 30; pos >= 0; pos--) { // goes from 180 degrees to 0 degrees
        angle = angle -1;
        if (angle <= 0) {
          angle = 0;
        }
        myservo.write(angle);              // tell servo to go to position in variable 'pos'
        delay(20);                       // waits 15ms for the servo to reach the position
      }
    }
     else if ( c == 'o') {
       if (angle > 90){
        int degree = angle - 90;
         for (int pos = degree; pos >=0; pos--) {
           angle = angle -1;
           myservo.write(angle);              // tell servo to go to position in variable 'pos'
           delay(20);   
         }
       }
       else {
        int degree = 90 - angle;
         for (int pos = 0; pos <= degree; pos++) { // goes from 0 degrees to 180 degrees
           angle = angle + 1;
           myservo.write(angle);              // tell servo to go to position in variable 'pos'
           delay(20);      
         }
       }
   }
  }
  //초음파를 보내며, 다 보내면 echo가 HIGH(신호받기) 상태로 대기 
  digitalWrite(trigPin, HIGH);  
  delay(10);  
  digitalWrite(trigPin, LOW);

  // echoPin 이 HIGH를 유지한 시간 즉, 초음파가 보냈다가 다시 들어온 시간
  float duration = pulseIn(echoPin, HIGH);  // 마이크로 초
  
  // HIGH 였을 때 시간을 가지고 물체와의 거리(distance)를 계산 한다.  
  // 초음파(소리)의 속도: 340m/s
  // 초(second)와 미터(m)를 마이크로 초와 cm로 변환하기 위해서 10000으로 나눠 준다
  // 왕복거리이므로 2로 나눠 준다  
  int distance = int(((float)(340 * duration) / 10000) / 2);  // 또는 duration / 58.8
  
  Serial.println(distance);  
  

  //시리얼모니터에 Echo가 HIGH인 시간 및 거리를 표시해준다.  
  if(distance <= 100) { // 100cm 이내인 경우
    digitalWrite(led, HIGH); // LED ON
  }
  else {
    digitalWrite(led, LOW); // LED OFF
  }
  delay(500);
}
