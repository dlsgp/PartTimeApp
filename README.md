
backend 사용방법

https://www.oracle.com/database/technologies/instant-client/winx64-64-downloads.html

![image](https://github.com/user-attachments/assets/41cd9597-278c-45b6-a06a-77090dc77dde)
![image](https://github.com/user-attachments/assets/16a9b05e-c7d8-4719-ba9f-429e35d895f6)

https://download.oracle.com/otn_software/nt/instantclient/2340000/instantclient-basic-windows.x64-23.4.0.24.05.zip
https://download.oracle.com/otn_software/nt/instantclient/2340000/instantclient-sdk-windows.x64-23.4.0.24.05.zip

위 링크에서 23.4.0.0.0 버전 Basic Package, SDK Package .zip 파일 받은 후, 각각 zip파일 압축 해제하면 instantclient_23_4 폴더가 나옴.

C 드라이브에 oracle 폴더 만든 후, 그 안에 C:\oracle\instantclient_23_4 이렇게 되게 넣으면 끝

![image](https://github.com/user-attachments/assets/521bd0c9-42d3-4815-9963-50dc1d68fc33)


환경 변수 설정

시스템속성 - 고급 시스템 설정 - 환경 변수

시스템 변수에서 PATH 변수 선택 후 편집

새로 만들기 클릭 후 C:\oracle\instantclient_23_4 추가하고 확인

VS Code 콘솔창에서 (backend용 콘솔창, frontend용 콘솔창 각각 하나씩 필요)

PartTimeApp> cd backend

yarn install 로 backend 폴더에 node_modules 생성

PartTimeApp\backend> node server.js

서버가 포트 3000에서 실행 중입니다. 뜨면 성공

만약 dotenv 에러가 난다 -> PartTimeApp에서 yarn install 후 다시 backend에서 node server.js 할것.


** 테스트시 꼭 해야하는 항목 **

PartTimeApp/components/src/service/apiService.js에서

const API_URL = "http://192.168.0.84:3000/api";
부분에서 본인 ip주소:3000 적을것.

PartTimeApp/backend/server.js 에서
const allowedOrigins = ['http://localhost:8081', 'https://mufxcd4-gusrl45612-8081.exp.direct', 'http://192.168.0.84:8081']; 부분에서 본인 ip주소:8081 추가할것.

PartTimeApp/config.js 에서
const API_BASE_URL = "http://192.168.0.84"; 부분에서 본인 아이피만 적을것. 포트번호 X


