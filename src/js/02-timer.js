// Описан в документации
import flatpickr from "flatpickr";
// Дополнительный импорт стилей
import "flatpickr/dist/flatpickr.min.css";

/* 1. Напиши скрипт таймера, который ведёт обратный отсчет до определенной даты. Такой таймер может использоваться в блогах и интернет-магазинах, страницах регистрации событий, во время технического обслуживания и т. д. Посмотри демо видео работы таймера.
2. Элементы интефрейса
В HTML есть готовая разметка таймера, поля выбора конечной даты и кнопки, при клике по которой таймер должен запускаться. Добавь минимальное оформление элементов интерфейса.
3. Библиотека flatpickr
Используй библиотеку flatpickr для того чтобы позволить пользователю кроссбраузерно выбрать конечную дату и время в одном элементе интерфейса. Для того чтобы подключить CSS код библиотеки в проект, необходимо добавить еще один импорт, кроме того который описан в документации.
Библиотека ожидает что её инициализируют на элементе input[type="text"], поэтому мы добавили в HTML документ поле input#datetime-picker.
Вторым аргументом функции flatpickr(selector, options) можно передать необязательный объект параметров. Мы подготовили для тебя объект который нужен для выполнения задания. Разберись за что отвечает каждое свойство в документации «Options» и используй его в своем коде.
4. Выбор даты.
Метод onClose() из обьекта параметров вызывается каждый раз при закрытии элемента интерфейса который создает flatpickr. Именно в нём стоит обрабатывать дату выбранную пользователем. Параметр selectedDates это массив выбранных дат, поэтому мы берем первый элемент.
Если пользователь выбрал дату в прошлом, покажи window.alert() с текстом "Please choose a date in the future".
Если пользователь выбрал валидную дату (в будущем), кнопка «Start» становится активной.
Кнопка «Start» должа быть не активна до тех пор, пока пользователь не выбрал дату в будущем.
При нажатии на кнопку «Start» начинается отсчет времени до выбранной даты с момента нажатия.
5. Отсчет времени
При нажатии на кнопку «Start» скрипт должен вычислять раз в секунду сколько времени осталось до указанной даты и обновлять интерфейс таймера, показывая четыре цифры: дни, часы, минуты и секунды в формате xx:xx:xx:xx.
Количество дней может состоять из более чем двух цифр.
Таймер должен останавливаться когда дошел до конечной даты, то есть 00:00:00:00.
6. Если таймер запущен, для того чтобы выбрать новую дату и перезапустить его - необходимо перезагрузить страницу.
7. Для подсчета значений используй готовую функцию convertMs, где ms - разница между конечной и текущей датой в миллисекундах.
8. Форматирование времени
Функция convertMs() возвращает объект с рассчитанным оставшимся временем до конечной даты. Обрати внимание, что она не форматирует результат. То есть, если осталось 4 минуты или любой другой составляющей времени, то функция вернет 4, а не 04. В интерфейсе таймера необходимо добавлять 0 если в числе меньше двух символов. Напиши функцию addLeadingZero(value), которая использует метод метод padStart() и перед отрисовкой интефрейса форматируй значение.
9. Библиотека уведомлений.
Этот функционал не обязателен при сдаче задания, но будет хорошей дополнительной практикой.
Для отображения уведомлений пользователю вместо window.alert() используй библиотеку notiflix. */

const options = {
  enableTime: true, /* Включает выбор времени */
  time_24hr: true, /* Отображает средство выбора времени в 24-часовом режиме без выбора AM/PM, если включено */
  defaultDate: new Date(), /* Устанавливает начальную выбранную дату (даты). Если вы используете mode: "multiple"или диапазонный календарь, укажите Arrayобъекты Dateили массив строк даты, которые следуют за вашим файлом dateFormat. В противном случае вы можете указать один объект Date или строку даты */
  minuteIncrement: 1, /* Регулирует шаг ввода минут (включая прокрутку) */
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}









import '../css/common.css'; /*1:42 */

const refs = {
  startBtn: document.querySelector('button[data-action-start]'),
  stopBtn: document.querySelector('button[data-action-stop]'),
  clockface: document.querySelector('.js-clockface'),
};

class Timer {
  constructor({ onTick }) {
    this.intervalId = null;
    this.isActive = false;
    this.onTick = onTick;

    this.init();
  }

  init() {
    const time = this.getTimeComponents(0);
    this.onTick(time);
  }

  start() {
    if (this.isActive) {
      return;
    }

    const startTime = Date.now();
    this.isActive = true;

    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = currentTime - startTime;
      const time = this.getTimeComponents(deltaTime);

      this.onTick(time);
    }, 1000);
  }

  stop() {
    clearInterval(this.intervalId);
    this.isActive = false;
    const time = this.getTimeComponents(0);
    this.onTick(time);
  }

  /*
   * - Принимает время в миллисекундах
   * - Высчитывает сколько в них вмещается часов/минут/секунд
   * - Возвращает обьект со свойствами hours, mins, secs
   * - Адская копипаста со стека 💩
   */
  getTimeComponents(time) {
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { hours, mins, secs };
  }

  /*
   * Принимает число, приводит к строке и добавляет в начало 0 если число меньше 2-х знаков
   */
  pad(value) {
    return String(value).padStart(2, '0');
  }
}

const timer = new Timer({
  onTick: updateClockface,
});

refs.startBtn.addEventListener('click', timer.start.bind(timer));
refs.stopBtn.addEventListener('click', timer.stop.bind(timer));

/*
 * - Принимает время в миллисекундах
 * - Высчитывает сколько в них вмещается часов/минут/секунд
 * - Рисует интерфейс
 */
function updateClockface({ hours, mins, secs }) {
  refs.clockface.textContent = `${hours}:${mins}:${secs}`;
}