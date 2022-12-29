// (() => {})(); 함수 자동(즉시)호출
// 전역변수 함수를 피하기 위해 안에 작성

(() => {
  //여기에 선언하면 블록 안 어디서든 접근 가능
  let yOffset = 0; //window.pageYOffset을 대신할 변수
  let prevScrollHeight = 0; //현재 스크롤 위치 (yOffset)보다 이전에 위치한 스크롤 섹션 높이값의 합
  let currentScene = 0; //눈앞에 보고있는 (현재 활성화된) 씬
  let enterNewScene = false; //새로운 씬이 시작된 순간

  const sceneInfo = [
    //0
    {
      type: "sticky",
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        //html dom객체 요소들
        section: document.querySelector("#scroll__section_0"),
        messagaA: document.querySelector("#scroll__section_0 .main__message.a"),
        messagaB: document.querySelector("#scroll__section_0 .main__message.b"),
        messagaC: document.querySelector("#scroll__section_0 .main__message.c"),
        messagaD: document.querySelector("#scroll__section_0 .main__message.d"),
      },
      values: {
        //배열로 투명도[시작값,끝값] 값에 해당
        messageA_opacity: [0, 1],
      },
    },
    //1
    {
      type: "normal",
      heightNum: 5,
      scrollHeight: 0,
      objs: { section: document.querySelector("#scroll__section_1") },
    },
    //2
    {
      type: "sticky",
      heightNum: 5,
      scrollHeight: 0,
      objs: { section: document.querySelector("#scroll__section_2") },
    },
    //3
    {
      type: "sticky",
      heightNum: 5,
      scrollHeight: 0,
      objs: { section: document.querySelector("#scroll__section_3") },
    },
  ];

  function setLayout() {
    //각 스크롤 섹션의 높이 세팅
    for (let i = 0; i < sceneInfo.length; i++) {
      sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      sceneInfo[i].objs.section.style.height = `${sceneInfo[i].scrollHeight}px`;
    }
    //현재 스크롤 위치에 맞춰서 현재(활성화) 씬 세팅
    let totalScrollHeight = 0;
    //totalScrollHeight와 현재 위치 비교
    for (let i = 0; i < sceneInfo.length; i++) {
      totalScrollHeight = totalScrollHeight + sceneInfo[i].scrollHeight;
      if (totalScrollHeight >= yOffset) {
        //현재 스크롤 위치보다 토탈 스크롤 값이 같거나 커지면
        currentScene = i;
        break;
      }
    }
    document.body.setAttribute("id", `show__scene_${currentScene}`);
  }
  function calcValues(values, currentYOffset) {
    let returnValue;
    let scrollRatio = currentYOffset / sceneInfo[currentScene].scrollHeight;
    returnValue = scrollRatio * (values[1] - values[0] + values[0]);
    return returnValue;
    //기본적으로 리턴해주는 값이 있어야 계산된 결과값을 가져다 사용 가능
  }

  //활성화된 창의 해당 요소들만 애니메이션
  function playAnimaiton() {
    const objs = sceneInfo[currentScene].objs;
    const values = sceneInfo[currentScene].values;
    const currentYOffset = yOffset - prevScrollHeight;

    console.log(currentScene);
    switch (currentScene) {
      case 0:
        let messageA_opacity_in = calcValues(
          values.messageA_opacity,
          currentYOffset
        );
        objs.messagaA.style.opacity = messageA_opacity_in;
        console.log(messageA_opacity_in);

        break;
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;
    }
  }

  // 현재 활성화된 창
  function scrollLoop() {
    enterNewScene = false;
    prevScrollHeight = 0;

    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight = prevScrollHeight + sceneInfo[i].scrollHeight;
    }
    //증가
    if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      enterNewScene = true;

      currentScene++;

      document.body.setAttribute("id", `show__scene_${currentScene}`);
    }
    //감소
    if (yOffset < prevScrollHeight) {
      enterNewScene = true;
      if (currentScene == 0) return; //브라우저 바운스로 마이너스되는 것 방지
      currentScene--;
      document.body.setAttribute("id", `show__scene_${currentScene}`);
      //바뀌는 순간에만 체크해주면 됨
    }
    if (enterNewScene) return;
    playAnimaiton();
  }

  window.addEventListener("scroll", () => {
    yOffset = window.pageYOffset;
    scrollLoop();
  });
  window.addEventListener("resize", setLayout);
  window.addEventListener("load", setLayout);
})();
