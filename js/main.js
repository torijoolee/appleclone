// (() => {})(); 함수 자동(즉시)호출
// 전역변수 함수를 피하기 위해 안에 작성

(() => {
  //여기에 선언하면 블록 안 어디서든 접근 가능
  let yOffset = 0; //window.pageYOffset을 대신할 변수
  let prevScrollHeight = 0; //현재 스크롤 위치 (yOffset)보다 이전에 위치한 스크롤 섹션 높이값의 합
  let currentScene = 0; //눈앞에 보고있는 (현재 활성화된) 씬

  const sceneInfo = [
    //0
    {
      type: "sticky",
      heightNum: 5,
      scrollHeight: 0,
      objs: { section: document.querySelector("#scroll__section_0") },
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
  // 현재 활성화된 창
  function scrollLoop() {
    prevScrollHeight = 0; //스크롤 할 때마다 값 초기화
    //for(let i=0; i<sceneInfo.length; i++)
    //네 구간 전체의 합

    //현재 활성화된 씬 0,1,2,3
    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight = prevScrollHeight + sceneInfo[i].scrollHeight;
      // console.log(`prevScrollHeight:${prevScrollHeight}`);
    }
    //증가
    if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      currentScene++;
      document.body.setAttribute("id", `show__scene_${currentScene}`);
    }
    //감소
    if (yOffset < prevScrollHeight) {
      if (currentScene == 0) return; //브라우저 바운스로 마이너스되는 것 방지
      currentScene--;
      document.body.setAttribute("id", `show__scene_${currentScene}`);
      //바뀌는 순간에만 체크해주면 됨
    }
    console.log(currentScene);
    // document.body.setAttribute("id", `show__scene_${currentScene}`);
  }

  window.addEventListener("scroll", () => {
    yOffset = window.pageYOffset;
    scrollLoop();
  });
  window.addEventListener("resize", setLayout);
  window.addEventListener("load", setLayout);
})();
