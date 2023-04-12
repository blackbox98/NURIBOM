CI/CD

CI/CD 작동 방식은 GitLab에서 Push Event가 발생하면 WebHook 기능을 통해 Jenkins에서 자동으로 빌드를 실행합니다. Jenkins에서 Nginx서버를 내포한 React, Spring Boot 각 디렉토리 내부의 Dockerfile을 활용하여 Docker 이미지를 생성한 후 SSH 연결을 통해 AWS에 Docker Container를 생성하는 방식입니다.

1. MobaXterm을 이용해 EC2 서버 원격 접속.
2. Ubuntu환경에서 Docker 설치.
3. Docker-compose.yml을 만들고 Docker-compose up –d 명령어를 사용하여 Jenkins와 프로젝트에 사용할 MySQL 컨테이너를 생성.
   ![image](https://user-images.githubusercontent.com/97587150/202908980-3dde6966-56c4-48a1-b752-5703dd2d7f6f.png)
4. 새로운 Jenkins 프로젝트 생성 및 설정
   ![image](https://user-images.githubusercontent.com/97587150/202909015-0dffcb01-a22c-4d0e-ad33-341e1915c86a.png)
   A. 구성에서 소스코드 관리 -> Git 설정에서 Git 레포지토리에 관한 설정 진행

![image](https://user-images.githubusercontent.com/97587150/202909028-5c0d8c5e-9262-416d-9fcc-2e2250e0bc41.png)

B. 빌드 유발 탭에서 아래와 같이 체크박스 체크. 그 후 고급 버튼을 클릭하고 Secret token을 찾아 Generate 버튼을 눌러 토큰을 생성. (GitLab과 WebHook 연결에 사용)

![image](https://user-images.githubusercontent.com/97587150/202909044-b998c352-220a-4f65-a3f4-706432d286ae.png)

![image](https://user-images.githubusercontent.com/97587150/202909067-d10f3577-d1b8-4cbc-9194-9e39d141c101.png)

C. Steps에서 Execute shell을 추가하여 다음과 같이 입력 후 저장.

![image](https://user-images.githubusercontent.com/97587150/202909080-d0e5b028-0a80-420f-b6c5-96f24f3dc33b.png)
![image](https://user-images.githubusercontent.com/97587150/202909092-8063d057-87b4-4d51-96f8-4b3ae04f7f54.png)

5. 자동 빌드를 위한 GitLab WebHook 연결.
   A. 배포할 프로젝트의 GitLab 레포지토리에서 Settings-> Webhooks 페이지로 이동 후 URL에는 http://배포서버공인IP:9090/project/{생성한jenkins프로젝트 명}/을 입력, Secret token에는 젠킨스 프로젝트 생성 시 발행한 Sercret token 입력.
   ![image](https://user-images.githubusercontent.com/97587150/202909111-6d9be196-ccbd-4f5e-ab35-e51f3fe267cc.png)
   ![image](https://user-images.githubusercontent.com/97587150/202909125-bcf50d06-956f-4191-b039-2fb592ccf1a1.png)
   B. Webhook을 생성 후 test로 정상 작동하는지 확인.

6. 젠킨스 SSH 연결 설정 (Publish over SSH)
   A. Dashboard -> Jenkins 관리 -> 시스템 설정의 Publish over SSH탭으로 이동
   B. SSH Servers 탭에 추가 버튼 클릭
   C. Name, Hostname, Username을 아래와 같이 입력 후 고급 버튼 클릭.
   ![image](https://user-images.githubusercontent.com/97587150/202909152-d1a40039-98e5-4522-8a78-fc76549b8923.png)
   D. Use password authentication, or use different key 체크 후, 제공 받은 pem 파일의 내용을 복사 붙여 넣기.
   ![image](https://user-images.githubusercontent.com/97587150/202909159-841d89eb-d5da-4b78-baa4-caa59676a347.png)
7. 빌드 후 조치
   A. 프로젝트 구성 페이지의 빌드 후 조치 추가 클릭, Send build artifacts over SSH를 선택
   B. 빌드 후 실행할 명령문을 다음과 같이 작성
   ![image](https://user-images.githubusercontent.com/97587150/202909172-ce379bcd-4e3d-4070-b4e6-f87aba6c4f5e.png)
   ![image](https://user-images.githubusercontent.com/97587150/202909183-a188201d-5e03-4211-bbf9-657b115ae041.png)
8. HTTPS 적용 및 Nginx 설정
   A. 다음 명령어를 통해 Certbot container를 생성하고 인증서를 발급
   ![image](https://user-images.githubusercontent.com/97587150/202909199-932e8d66-5846-4101-bac3-d45940842b72.png)
   B. standalone를 선택하고 이메일, 도메인 이름 등을 차례로 입력
   C. ubuntu환경에서 Vue 프로젝트 폴더로 이동 후 deploy_conf 디렉토리를 생성하고 그 안에서 nginx.conf 파일을 생성(설정 내용은 빌드 상세 내용 확인).

빌드 상세내용
Docker-compose와 Dockerfile 파일을 이용해 빌드합니다.

- Docker-compose.yml
  ![image](https://user-images.githubusercontent.com/97587150/202909221-6a639c2c-f8ed-40ec-83c0-d6f0b9275805.png)
- Spring Boot Dockerfile(yogidice/Dockerfile)
  ![image](https://user-images.githubusercontent.com/97587150/202909243-41db1ccd-fcb5-4697-8eb5-01c52b094f31.png)
- React Dockerfile(nuribom-admin)
  ![image](https://user-images.githubusercontent.com/97587150/202909265-18de646a-6b29-4af3-8273-b27add95dd29.png)
- React Dockerfile(nuribom-display)
  ![image](https://user-images.githubusercontent.com/97587150/202909281-dfde1244-87aa-41a3-a61d-8b00992f36c7.png)
- Nginx 설정
  ![image](https://user-images.githubusercontent.com/97587150/202909330-82fa3703-120c-49c8-96e6-431ee30c4b68.png)
  80번 포트(http)로 들어온 요청은 443번 포트(https)로 리다이렉트 시킨다. url 에 /api가 붙어 있는 요청은 Spring Boot서버로 연결한다.
