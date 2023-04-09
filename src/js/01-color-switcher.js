function getRandomHexColor() { /* генерации случайного цвета */
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
/* 1. В HTML есть кнопки «Start» и «Stop». Напиши скрипт, который после нажатия кнопки «Start», раз в секунду меняет цвет фона <body> на случайное значение используя инлайн стиль. При нажатии на кнопку «Stop», изменение цвета фона должно останавливаться.
2. Учти, на кнопку «Start» можно нажать бесконечное количество раз. Сделай так, чтобы пока изменение темы запушено, кнопка «Start» была не активна (disabled).
3. Для генерации случайного цвета используй функцию getRandomHexColor.
*/
const backgroundColorEl = document.querySelector('body'); /* ссылка на body */
const startBtn = document.querySelector("[data-start]");
const stopBtn = document.querySelector("[data-stop]");
let timerId = null;
let isActive = false;
stopBtn.disabled = true;


startBtn.addEventListener("click", () => { /* При клике на кнопку «Start» запустим интервал и будем каждую секунду выводить в консоль строку. Используем Math.random() чтобы строки были разные */
  // startBtn.disabled = false;
  if (isActive) {
    return;
  }
  isActive = true;
  // startBtn.disabled = false;
  timerId = setInterval(() => { /* Метод setInterval() - способ повторения кода, интервал запускает выполнение функции не один раз, а регулярно повторяет её через указанный промежуток времени. */
    // isActive = true;
    console.log(`getRandomHexColor()`);
    backgroundColorEl.style.backgroundColor = getRandomHexColor(); /* стилизируем body функцией getRandomHexColor */
    startBtn.disabled = true;
    stopBtn.disabled = false;
  }, 1000);
});
// console.log(startBtn);
stopBtn.addEventListener("click", () => { /* По клику на кнопку «Stop» вызовем clearInterval() и передадим идентификатор интервала который надо остановить. */
  
  if (isActive = false) {
    return;
  }
  clearInterval(timerId);
  stopBtn.disabled = true;
  startBtn.disabled = false;
  console.log(`Interval with id ${timerId} has stopped!`);
});
