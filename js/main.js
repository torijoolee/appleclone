// (() => {})(); 함수 자동호출
// 전역변수 함수를 피하기 위해 안에 작성

(() => {
  const sceneInfo = [
    //0
    {
      type: "sticky",
      heightNum: 5,
      scrollHeight: 0,
      objs: { container: document.querySelector("#scroll__section_0") },
    },
    //1
    {
      type: "normal",
      heightNum: 5,
      scrollHeight: 0,
      objs: { container: document.querySelector("#scroll__section_1") },
    },
    //2
    {
      type: "sticky",
      heightNum: 5,
      scrollHeight: 0,
      objs: { container: document.querySelector("#scroll__section_2") },
    },
    //3
    {
      type: "sticky",
      heightNum: 5,
      scrollHeight: 0,
      objs: { container: document.querySelector("#scroll__section_3") },
    },
  ];

  function setLayout() {
    //각 스크롤 섹션의 높이
    for (let i = 0; i < sceneInfo.length; i++) {
      sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      sceneInfo[
        i
      ].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
    }
  }
  window.addEventListener("resize", setLayout);
  setLayout();
})();
