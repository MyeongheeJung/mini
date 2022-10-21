function checkPhone1(){
  document.getElementById('phone1').value;
  if (document.getElementById('phone1').value.length === 3) {
    document.getElementById('phone2').focus();
  }
}

function checkPhone2(){
  document.getElementById('phone2').value;
  if (document.getElementById('phone2').value.length === 4) {
    document.getElementById('phone3').focus();
  }
}

function checkPhone3() {
  const ph1 = document.getElementById('phone1').value;
  const ph2 = document.getElementById('phone2').value;
  const ph3 = document.getElementById('phone3').value;
  if (ph1.length === 3 && ph2.length === 4 && ph3.length === 4) {
    document.getElementById("token__make__btn").style = "background-color: #0068FF; color: #fff; cursor: pointer"
    document.getElementById("token__make__btn").removeAttribute("disabled")
  }
}

function getToken(){
  const makeToken = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
  document.getElementById('token').innerText = makeToken;
  document.getElementById("token__make__btn").style =  "background-color: #FFFFFF; cursor: default;"
  document.getElementById("token__make__btn").setAttribute("disabled", "true")
  document.getElementById('token__check__btn').style = "background-color: #0068FF; color: #fff; cursor: pointer"
  document.getElementById("token__check__btn").removeAttribute("disabled")
  startTokenTimer()
}

let countdown;
function startTokenTimer(){
  let timer = 180
  countdown = setInterval(() => {
      if(timer >= 0){
          const minutes = Math.floor(timer / 60)
          const seconds = timer % 60
          document.getElementById("token__timer").innerText = minutes + ":" + String(seconds).padStart(2, "0")
          timer -= 1
      } else {
          document.getElementById("token").innerText = "000000"
          document.getElementById("token__make__btn").style = "background-color: ##fff; color: gray;"
          document.getElementById("token__make__btn").setAttribute("disabled", "true")
          
          document.getElementById("token__timer").innerText = "3:00"
          document.getElementById("token__check__btn").style = "background-color: ##fff; color: gray;"
          document.getElementById("token__check__btn").setAttribute("disabled", "true")
          
          clearInterval(countdown)
      }
  }, 1000)
}

function confirmToken(){
  clearInterval(countdown)
  document.getElementById("token__check__btn").style = "background-color: #FFFFFF; color:gray; cursor: default;"
  document.getElementById("token__check__btn").setAttribute("disabled", "true")
  document.getElementById("token__check__btn").innerText = "인증완료"
  alert("인증이 완료되었습니다.")

  document.getElementById("confirm__btn").style = "background-color: #FFFFFF; color: #0068FF; border: 1px solid #0068FF ;cursor: pointer;"
  document.getElementById("confirm__btn").removeAttribute("disabled")
}

function checkValidation(){
  const email = document.getElementById("email").value
  const userName = document.getElementById("userName").value
  const password1 = document.getElementById("password1").value
  const password2 = document.getElementById("password2").value
  const location = document.getElementById("location").value
  const genderWoman = document.getElementById("gender__woman").checked
  const genderMan = document.getElementById("gender__man").checked

  let isValid = true
  if (email === "") {
      document.getElementById("error__email").innerText = "이메일을 입력해 주세요."
      isValid = false
  } else if(!email.includes("@")) {
      document.getElementById("error__email").innerText = "이메일이 올바르지 않습니다."
      isValid = false
  } else {
      document.getElementById("error__email").innerText = ""
  }

  if(userName === "") {
    document.getElementById("error__userName").innerText = "이름을 입력해 주세요."
    isValid = false
  } else {
    document.getElementById("error__userName").innerText = ""
  }


  if(password1 === ""){
      document.getElementById("error__password1").innerText = "비밀번호를 입력해 주세요."
      isValid = false
  } else {
      document.getElementById("error__password1").innerText = ""
  }

  if(password2 === ""){
      document.getElementById("error__password2").innerText = "비밀번호를 입력해 주세요."
      isValid = false
  } else {
      document.getElementById("error__password2").innerText = ""
  }

  if(password1 !== password2) {
      document.getElementById("error__password1").innerText = "비밀번호가 일치하지 않습니다."
      document.getElementById("error__password2").innerText = "비밀번호가 일치하지 않습니다."
      isValid = false
  }

  if(location !== "서울" && location !== "경기" && location !== "인천"){
      document.getElementById("error__location").innerText = "지역을 선택해 주세요."
      isValid = false
  } else {
      document.getElementById("error__location").innerText = ""
  }

  if(genderWoman === false && genderMan === false){
      document.getElementById("error__gender").innerText = "성별을 선택해 주세요."
      isValid = false
  } else {
      document.getElementById("error__gender").innerText = ""
  }

  if(isValid === true){
      alert(`${userName}님, 코드캠프 가입을 축하합니다.🎉`)
  }
}