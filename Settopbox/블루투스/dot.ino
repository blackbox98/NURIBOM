#include "LedControl.h" 

void shift_words(byte words[][8], String sft_direction, int n_shift, int n_words, LedControl lc );

LedControl dot_matrix=LedControl(12,11,10,4); 
// DIN 핀을 7번에 CLK 핀을 8번에 CS핀을 9번에 연결
// (DIN, CLK, CS, 연결할 도트 매트릭스의 개수)
 
int n_matrix = 4;
// 이진수 배열로 바꾸는 것은 http://embed.plnkr.co/3VUsekP3jC5xwSIQDVHx 를 참조
byte words[9][8]={
  {B00111100,B01000010,B10100101,B10000001,B10100101,B10011001,B01000010,B00111100},
  {B00111100,B01000010,B10100101,B10000001,B10111101,B10000001,B01000010,B00111100},
  {B00111100,B01000010,B10100101,B10000001,B10011001,B10100101,B01000010,B00111100},
  {B01100110,B11111111,B11111111,B11111111,B01111110,B00111100,B00011000,B00000000},
  {B01100110,B10011001,B10000001,B10000001,B01000010,B00100100,B00011000,B00000000}
  
};

void setup(){
 for(int ii=0; ii<n_matrix; ii++) // 매트릭스 0번부터 3번까지 세팅
  {
   dot_matrix.shutdown(ii,false); // 0~3번까지 매트릭스 절전모드 해제
   dot_matrix.setIntensity(ii,4); // 매트릭스의 밝기 0-15 사이의 정수
   dot_matrix.clearDisplay(ii); // 매트릭스를 초기화
  }
}

void loop() {
 
  for(int ii=0; ii<72; ii++){ // 왼쪽으로 시프트
    shift_words(words, "left", 1, 9, dot_matrix);
    delay(50);
  }
}

// 문장을 시프트하는 함수
void shift_words(byte words[][8], String sft_direction, int n_shift, int n_words, LedControl lc ){
  if(sft_direction == "left"){        // 시프트 방향이 왼쪽인 경우
    for(int jj=0; jj<n_shift; jj++){  // 시프트 횟수만큼 반복
      byte tmp[n_words];    // 사용할 임시값들 선언
      for(int ii=0; ii< 8; ii++){     // 매트릭스들 각 행들에 대해(8개의 행들 각각에 대해)
        for(int kk=0; kk<n_words; kk++){
          tmp[kk] = words[kk][ii]>>7;    // 매트릭스 행의 MSB를 tmp1에 저장(ex: '1'0010010 >> 7 = 1)
        }
        for(int kk=0; kk<n_words; kk++){
          words[kk][ii] = words[kk][ii] << 1;     // 매트릭스 행 성분들을 왼쪽으로 하나씩 시프트
          if(kk != n_words-1){
            words[kk][ii] = words[kk][ii] | tmp[kk+1]; // 오른쪽 매트릭스의 MSB 성분을 LSB에 붙임
          }else{
            words[kk][ii] = words[kk][ii] | tmp[0];
          }          
        }          
      }
    }  
  }
  else if(sft_direction == "right"){     // 시프트 방향이 오른쪽인 경우
    for(int jj=0; jj<n_shift; jj++){  // 시프트 횟수만큼 반복
      byte tmp[n_words];    // 사용할 임시값들 선언
      for(int ii=0; ii< 8; ii++){     // 매트릭스들 각 행들에 대해(8개의 행들 각각에 대해)
        for(int kk=0; kk<n_words; kk++){
          tmp[kk] = words[kk][ii] & 0x00000001;   // 매트릭스 행의 LSB를 tmp1에 저장(ex: 1001001'0' & 0x00000001 = 0)
        }
        for(int kk=0; kk<n_words; kk++){
          words[kk][ii] = words[kk][ii] >> 1;     // 매트릭스 행 성분들을 오른쪽으로 하나씩 시프트
          if(kk != 0){
            words[kk][ii] = words[kk][ii] | (tmp[kk-1] << 7); // 왼쪽 매트릭스의 LSB 성분을 MSB에 붙임
          }else{
            words[kk][ii] = words[kk][ii] | (tmp[n_words-1] << 7);
          }          
        }          
      }
    } 
  }
  else if(sft_direction == "up"){         // 시프트 방향이 위쪽인 경우
    for(int jj=0; jj<n_shift; jj++){      // 시프트 횟수만큼 반복
      byte tmp[n_words];                   // 사용할 임시값들 선언
      for(int jj=0; jj<n_words; jj++){
        tmp[jj] = words[jj][0];                     // 매트릭스의 가장 첫 행을 임시값에 저장
      }
      for(int ii=0; ii<7; ii++){          // 매트릭스의 다음행을 이전 행에 저장
        for(int jj=0; jj<n_words; jj++){
          words[jj][ii] = words[jj][ii+1];
        }
      }
      for(int jj=0; jj<n_words; jj++){
        words[jj][7] = tmp[jj];                     // 매트릭스의 끝 행에 임시값(첫행) 저장
      }
    }
  }  
  else if(sft_direction == "down"){       // 시프트 방향이 아래쪽인 경우
    for(int jj=0; jj<n_shift; jj++){      // 시프트 횟수만큼 반복
      byte tmp[n_words];                  // 사용할 임시값들 선언
      for(int jj=0; jj<n_words; jj++){
        tmp[jj] = words[jj][7];                     // 매트릭스의 가장 첫 행을 임시값에 저장
      }

      for(int ii=7; ii>0; ii--){          // 매트릭스의 이전행을 다음행에 저장
        for(int jj=0; jj<n_words; jj++){
          words[jj][ii] = words[jj][ii-1];
        }
      }
      for(int jj=0; jj<n_words; jj++){
        words[jj][0] = tmp[jj];                    // 매트릭스의 첫행에 임시값(끝행) 저장
      }
    }
  }
 for(int ii=0; ii<8; ii++){
  for(int jj=0; jj<4; jj++){    
   lc.setRow(jj,ii,words[jj][ii]); // 전체 매트릭스 중 0-3번까지만 출력(4글자)
  }
  }
}