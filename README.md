# SOGM
SOGM Project

[구현제안서]

One-Stop End to End Automation UAT Solution (OSEAUS)

[플랫폼 구성]

![UI 미리보기](./assets/platform_stack.png)

[주요기능]

1. 웹 페이지 및 앱 시각 정보 수집 모듈
- 지정된 URL 및 하위 링크를 재귀적으로 탐색하며 전체 UI 스크린샷을 캡처
- 이미지 + DOM 구조와 URL 흐름을 활용해 화면 별 메타데이터 수집 
  (컴포넌트 이름, 버튼/입력 필드 위치 등)

2. 멀티모달 LLM 기반 테스트 시나리오 생성 모듈
- Vision-Text 기반 LLM을 활용해 UI 흐름 및 사용자 행위 예측
- 시각적 요소를 기반으로 사용자 액션(클릭, 입력, 탐색 등)을 자동으로 추론
- Playwright, Appium 기반의 테스트 스크립트 자동 생성

3. 코드/이미지 기반 변화 감지 및 차등 테스트 모듈
- 변경 전/후 코드 diff 및 스크린샷 유사도 비교 (Perceptual Hashing, CLIP 등 활용)
- 변경 영향도 분석 후, 관련된 페이지만 선택적으로 테스트 수행

4. 테스트 실행 및 리포트 생성 모듈
- 생성된 테스트 시나리오를 실행하고 결과를 자동 수집

[데모 사이트(Mock) URL]

웹테스트 선택 -> url 입력 -> 테스트 진행 결과 -> 대시보드 리포팅 확인

https://v0-one-stop-automation-solution.vercel.app/

![UI 미리보기](./assets/demo1.png)

![UI 미리보기](./assets/demo2.png)

![UI 미리보기](./assets/demo3.png)

![UI 미리보기](./assets/demo4.png)

[PoC 사이트 URL]

url 입력 -> 프롬프트 추가 -> LLM -> 테스트 케이스 생성, playwright test 스크립트 생성

https://partyrock.aws/u/byc3230/_M2fzRJ5l/WebTest-AI

![UI 미리보기](./assets/poc1.png)

![UI 미리보기](./assets/poc2.png)

![UI 미리보기](./assets/poc3.png)

결과 SnapShot

https://partyrock.aws/u/byc3230/_M2fzRJ5l/WebTest-AI/snapshot/s9vuAzqo1

[연구 진행 시나리오] 

시나리오 1 - UAT Full Test Case  (시스템 오픈전)

- URL -> 정보 받고 -> 스크립트 실행 -> 화면 이미지 -> LMM -> 웹 경우 playwright 스크립트 생성, App 일 경우 appium 스크립트 생성 -> 실행-> 결과 리포트 도출

시나리오 2 - SR (Service Request) Test Case (변경된 웹페이지 및 연관된 페이지만 테스트 진행하는 case)

- 이미지 (변경 전, 변경 후)와 코드(변경 전, 변경 후)를 입력받아 -> LMM -> 웹 경우 playwright 스크립트 생성, App 일 경우 appium 스크립트 생성 -> 실행-> 결과 리포트 도출
