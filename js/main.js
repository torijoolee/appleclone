import ipads from "../data/ipads.js";
import navigations from "../data/navigations.js";
//장바구니
const basketStarterEl = document.querySelector("header .basket-starter");
const basketEl = basketStarterEl.querySelector(".basket");

basketStarterEl.addEventListener("click", function (event) {
  console.log(event.currentTarget);
  event.stopPropagation();
  if (basketEl.classList.contains("show")) {
    hideBasket();
  } else {
    showBasket();
  }
});
basketEl.addEventListener("click", function (event) {
  event.stopPropagation();
});
window.addEventListener("click", function () {
  hideBasket();
});
function showBasket() {
  basketEl.classList.add("show");
}
function hideBasket() {
  basketEl.classList.remove("show");
}

//검색창
const headerEl = document.querySelector("header");
//전개연산자를 사용하는 얕은 복사
//li태그를 하나의 배열로 관리
const menuElems = [...document.querySelectorAll("ul.menu > li")];
const searchWrapEl = document.querySelector(".search-wrap");
const searchInputEl = document.querySelector("input");
const searchCloserEl = document.querySelector(".search-closer");
const searchStarterEl = document.querySelector(".search-starter");
const searchShadowEl = document.querySelector(".search-wrap .shadow");
const autoCompletesElems = [
  ...document.querySelectorAll(".autocompletes ul > li"),
];

searchStarterEl.addEventListener("click", showSearch);
searchCloserEl.addEventListener("click", hideSearch);
searchShadowEl.addEventListener("click", hideSearch);

function showSearch() {
  headerEl.classList.add("searching");
  //html 문서 선택
  document.documentElement.classList.add("fixed");
  // 배열 순서 바꾸기
  //각각의 태그들이 각각 다른 지연시간을 갖게하기위해
  menuElems.reverse().forEach((el, index) => {
    el.style.transitionDelay = (index * 0.4) / menuElems.length + "s";
  });
  autoCompletesElems.forEach((el, index) => {
    el.style.transitionDelay = (index * 0.4) / autoCompletesElems.length + "s";
  });
  setTimeout(() => {
    searchInputEl.focus();
  }, 600);
  //
}
function hideSearch() {
  headerEl.classList.remove("searching");
  document.documentElement.classList.remove("fixed");
  menuElems.reverse().forEach((el, index) => {
    el.style.transitionDelay = (index * 0.2) / menuElems.length + "s";
  });
  autoCompletesElems.reverse().forEach((el, index) => {
    el.style.transitionDelay = (index * 0.4) / autoCompletesElems.length + "s";
  });
  autoCompletesElems.reverse();
  searchInputEl.value = "";
}

// 요소의 가시성 관찰
const io = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) {
      //화면에 보이지 않을때는 리턴
      return;
    }
    //화면에 보일때는
    entry.target.classList.add("show");
  });
});

const infoEls = document.querySelectorAll(".info");
infoEls.forEach(function (info) {
  io.observe(info);
});

// 비디오재생!

const video = document.querySelector(".stage video");
const playBtn = document.querySelector(".controller--play ");
const pauseBtn = document.querySelector(".controller--pause ");

//video에 기본적으로 있는 자바스크립트 함수
//play, pause
playBtn.addEventListener("click", function () {
  video.play();
  playBtn.classList.add("hide");
  pauseBtn.classList.remove("hide");
});
pauseBtn.addEventListener("click", function () {
  video.pause();
  pauseBtn.classList.add("hide");
  playBtn.classList.remove("hide");
});

//당신에게 맞는 ipads 렌더링
// COMPARE
const itemEls = document.querySelector("section.compare .items");
console.log(ipads);
ipads.forEach(function (ipad) {
  const itemEl = document.createElement("div");
  let colorList = "";
  ipad.colors.forEach((color) => {
    colorList += `
    <li style="background-color: ${color}"></li>`;
  });
  itemEl.classList.add("item");
  itemEl.innerHTML = /* HTML*/ `
  <div class="thumbnail">
    <img src="${ipad.thumbnail}" alt="${ipad.url}">
  </div>
  <ul class="colors">
    ${colorList}
  </ul>
    <h3 class="name">${ipad.name}</h3>
    <p class="tagline">
      ${ipad.tagline}
    </p>
    <p class="price">₩${ipad.price.toLocaleString("en-US")}부터</p>
    <button class="btn">구입하기</button>
    <a class="link" href="${ipad.url}">
  더 알아보기</a>
  `;
  itemEls.append(itemEl);
});

// navigations
const navigationsEl = document.querySelector("footer .navigations");
navigations.forEach((nav) => {
  const mapEl = document.createElement("div");
  mapEl.classList.add("map");
  let mapList = "";
  nav.maps.forEach(function (map) {
    mapList += /*html*/ `
    <li> 
    <a href="${map.url}">${map.name}</a>
    </li>`;
  });

  mapEl.innerHTML = /*html*/ `
  <h3>
    <span class="text">${nav.title}</span>
  </h3>
  <ul>
    ${mapList}
  </ul>
  `;
  navigationsEl.append(mapEl);
});
