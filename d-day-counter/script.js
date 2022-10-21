const messageContainer = document.querySelector("#d-day-message");
const container = document.querySelector("#d-day-container");

// 로컬스토리지에 저장된 거 가져오기
const savedDate = localStorage.getItem("saved-date");
const intervalIdArr = [];

container.style.display = "none";
messageContainer.innerHTML = "<h3>D-day를 입력해주세요.</h3>";

const dateFormMaker = () => {
  const inputYear = document.querySelector("#target-year-input").value;
  const inputMonth = document.querySelector("#target-month-input").value;
  const inputDate = document.querySelector("#target-date-input").value;

  const dateFormat = `${inputYear}-${inputMonth}-${inputDate}`;
  return dateFormat;
};

const counterMaker = (data) => {
  if (data !== savedDate) {
    // 로컬스토리지에 저장
    localStorage.setItem("saved-date", data);
  }
  const nowDate = new Date();
  const targetDate = new Date(data).setHours(0, 0, 0, 0);
  const remaining = (targetDate - nowDate) / 1000;

  // 만약 remaining이 0이라면, 타이머 종료 출력
  if (remaining <= 0) {
    container.style.display = "none";
    messageContainer.innerHTML = "<h3>타이머가 종료되었습니다.</h3>";
    messageContainer.style.display = "flex";
    setClearInterval();
    // setClearInterval(textObj.timeEnd);
    return;
  } else if (isNaN(remaining)) {
    // 만약 잘못된 날짜 들어오면, 유효한 시간대가 아닙니다. 출력
    container.style.display = "none";
    messageContainer.innerHTML = "<h3>유효한 시간대가 아닙니다</h3>";
    messageContainer.style.display = "flex";
    setClearInterval();
    // setClearInterval(textObj.wrong);
    return;
  }

  const remainingObj = {
    remainingDate: Math.floor(remaining / 3600 / 24),
    remainingHours: Math.floor(remaining / 3600) % 24,
    remainingMin: Math.floor(remaining / 60) % 60,
    remainingSec: Math.floor(remaining) % 60,
  };

  const timeKeys = Object.keys(remainingObj);
  const documentArr = ["days", "hours", "min", "sec"];

  const format = (time) => {
    if (time < 10) return "0" + time;
    else return time;
  };

  // for of 문 - 배열에 사용
  let i = 0;
  for (let tag of documentArr) {
    const remainingTime = format(remainingObj[timeKeys[i]]);
    document.getElementById(tag).textContent = remainingTime;
    i++;
  }
};

const starter = (targetDateInput) => {
  if (!targetDateInput) {
    targetDateInput = dateFormMaker();
  }

  container.style.display = "flex";
  messageContainer.style.display = "none";
  setClearInterval();
  // 함수로 전달된 값을 인자로 전달
  counterMaker(targetDateInput);
  const intervalId = setInterval(() => counterMaker(targetDateInput), 1000);
  intervalIdArr.push(intervalId);
};

const setClearInterval = () => {
  // 로컬스토리지 저장 된 키값으로 초기화
  localStorage.removeItem("saved-date");

  for (let i = 0; i < intervalIdArr.length; i++) {
    clearInterval(intervalIdArr[i]);
  }
};

const resetTimer = () => {
  container.style.display = "none";
  messageContainer.innerHTML = "<h3>D-day를 입력해주세요.</h3>";
  messageContainer.style.display = "flex";
  setClearInterval();
};

// 로컬스토리지 저장 된 값 존재여부 확인하기
if (savedDate) {
  starter(savedDate);
} else {
  messageContainer.innerHTML = "<h3>D-day를 입력해주세요.</h3>";
}

// ===================================================================
// const documentObj = {
//   days: document.querySelector("#days"),
//   hours: document.querySelector("#hours"),
//   min: document.querySelector("#min"),
//   sec: document.querySelector("#sec"),
// };
// const docKeys = Object.keys(documentObj);

// for 문
//  for (let i = 0; i < timeKeys.length; i++) {
//   documentObj[docKeys[i]].textContent = remainingObj[timeKeys[i]];
// }

// for in 문 - 객체에 사용
//   let i = 0;
//   for (let key in documentObj) {
//     documentObj[key].textContent = remainingObj[timeKeys[i]];
//     i++;
//   }
// };

// for문 starter 구현
// const starter = () => {
//   container.style.display = "flex";
//   messageContainer.style.display = "none";

//   for (let i = 0; i < 100; i++) {
//     setTimeout(() => {
//       counterMaker();
//     }, 1000 * i);
//   }
// };

// while문 starter 구현
// const starter = () => {
//   container.style.display = "flex";
//   messageContainer.style.display = "none";

//   let i = 0;
//   while (i < 100) {
//     setTimeout(() => {
//       counterMaker();
//     }, 1000 * i);
//     i++;
//   }
// };
