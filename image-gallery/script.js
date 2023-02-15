const req = new XMLHttpRequest();
req.open("get", "./json/image_list.json");
req.onreadystatechange = function () {
  if (this.readyState == 4) {
    const data = JSON.parse(this.response);
    for (let i = 0; i < data.length; i++) {
      const div = document.createElement("div");
      div.setAttribute("class", "image");
      div.onclick = function () {
        // if (this.getAttribute("class").indexOf("image-selected") == -1) {
        //   this.setAttribute("class", "image image-selected");
        // } else {
        //   this.setAttribute("class", "image");
        // }
        this.classList.toggle("image-selected");
      };

      div.onmouseover = function () {
        const mouseoverdDiv = this;
        this.timerId = setTimeout(function () {
          mouseoverdDiv.classList.add("image-magnified");
        }, 1000);
      };
      div.onmouseout = function () {
        clearTimeout(this.timerId);
        this.classList.remove("image-magnified");
      };
      const img = document.createElement("img");
      img.src = data[i];
      div.appendChild(img);
      document.body.appendChild(div);
    }
  }
};
req.send();

function selectAll(selectAllBtn) {
  const images = document.getElementsByClassName("image");
  for (let i = 0; i < images.length; i++) {
    if (selectAllBtn.value == "Unselect All") {
      images[i].classList.remove("image-selected");
    } else {
      images[i].classList.add("image-selected");
    }
  }
  if (selectAllBtn.value == "Unselect All") {
    selectAllBtn.value = "Select All";
  } else {
    selectAllBtn.value = "Unselect All";
  }
}

function slideShow(slideShowBtn) {
  const images = document.getElementsByClassName("image");
  let index = 0;
  images[index].classList.add("image-magnified");

  const intervalId = setInterval(function () {
    images[index].classList.remove("image-magnified");
    index++;
    if (index < images.length) {
      images[index].classList.add("image-magnified");
    } else {
      clearInterval(intervalId);
    }
  }, 1000);
}
