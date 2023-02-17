export class Keyboard {
  #switchEl;
  #fontSelectEl;
  #containerEl;
  #keyboardEl;
  #inputGroupEl;
  #inputEl;
  #keyPress = false;
  #mouseDown = false;

  constructor() {
    this.#assignElement();
    this.#addEvent();
  }

  #assignElement() {
    this.#containerEl = document.getElementById("container");
    this.#switchEl = document.getElementById("switch");
    this.#fontSelectEl = this.#containerEl.querySelector("#font");
    this.#keyboardEl = this.#containerEl.querySelector("#keyboard");
    this.#inputGroupEl = this.#containerEl.querySelector("#input-group");
    this.#inputEl = this.#inputGroupEl.querySelector("#input");
  }

  #addEvent() {
    this.#switchEl.addEventListener("change", this.#onChangeTheme);
    this.#fontSelectEl.addEventListener("change", this.#onChangeFont);
    document.addEventListener("keydown", this.#onKeyDown.bind(this));
    document.addEventListener("keyup", this.#onKeyUp.bind(this));
    this.#inputEl.addEventListener("input", this.#onInput);
    this.#keyboardEl.addEventListener(
      "mousedown",
      this.#onMouseDown.bind(this)
    );
    document.addEventListener("mouseup", this.#onMouseUp.bind(this));
  }

  #onChangeTheme(e) {
    console.log(e.target);
    document.documentElement.setAttribute(
      "theme",
      e.target.checked ? "dark-mode" : ""
    );
  }

  #onChangeFont(e) {
    document.body.style.fontFamily = e.target.value;
  }

  #onKeyDown(e) {
    this.#mouseDown = true;
    this.#keyPress = true;
    this.#inputGroupEl.classList.toggle(
      "error",
      /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(e.key)
    );

    this.#keyboardEl
      .querySelector(`[data-code=${e.code}]`)
      ?.classList.add("active");
  }

  #onKeyUp(e) {
    this.#mouseDown = false;
    this.#keyPress = false;
    this.#onCheckFnkey(e);
    this.#keyboardEl.querySelector(".active")?.classList.remove("active");
  }

  #onInput(e) {
    e.target.value = e.target.value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/, "");
  }

  #onMouseDown(e) {
    this.#mouseDown = true;
    this.#keyPress = true;
    e.target.closest("div.key")?.classList.add("active");
  }

  #onMouseUp(e) {
    this.#mouseDown = false;
    this.#keyPress = false;
    this.#onCheckFnkey(e);
    this.#keyboardEl.querySelector(".active")?.classList.remove("active");
  }

  #onCheckFnkey(e) {
    const keyEl = e.target.closest("div.key");
    const isActive = keyEl?.classList.contains("active");
    const keyVal = keyEl?.dataset.val;
    if (isActive && !!keyVal && keyVal !== "Space" && keyVal !== "Backspace") {
      this.#inputEl.value += keyVal;
    }
    if (isActive && keyVal === "Space") {
      this.#inputEl.value += " ";
    }
    if (isActive && keyVal === "Backspace") {
      this.#inputEl.value = this.#inputEl.value.slice(0, -1);
    }
  }
}
