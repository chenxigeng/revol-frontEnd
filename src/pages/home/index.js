import '../../assets/scripts/common/common.js'
import './home.scss'
import asideHtml from './aside.html'
import mainHtml from './main.html'
import $ from 'jquery';

let El_container = $('.container'); // 页面父元素
let El_aside = $('.container .aside') // 侧边栏区域
let El_main = $('.container .main') // 主内容区域

// 初始化
init();

// 方法
// 初始化html
function init () {
  El_main.append(mainHtml);
  El_aside.append(asideHtml);
  $('.btn-arrow-right').on('click', toggleAside);

  (timeDisplayInit())()
}
// 设置侧边栏显示/隐藏
function toggleAside () {
  El_container.toggleClass('showAside')
}

// 时间初始化
function timeDisplayInit () {
  let timer = null
  let El_timeDisplay = El_main.find('.main-container .timeDisplay-box') // 时间显示器父容器
  let El_timeDisplay_time = El_timeDisplay.find('.text-time')
  let El_timeDisplay_date = El_timeDisplay.find('.text-date')

  let weekEnum = {
    0: '日',
    1: '一',
    2: '二',
    3: '三',
    4: '四',
    5: '五',
    6: '六',
  }

  clearInterval(timer)
  return function () {
    timer = setInterval(() => {
      let date = new Date()
      let _hour = date.getHours() > 9 ? date.getHours() : ('0' + date.getHours())
      let _minute = date.getMinutes() > 9 ? date.getMinutes() : ('0' + date.getMinutes())
      let _second = date.getSeconds() > 9 ? date.getSeconds() : ('0' + date.getSeconds())
      let _year = date.getFullYear()
      let _month = date.getMonth() + 1
      let _day = date.getDate()
      let _week = date.getDay()

      let timeStr = `${_hour}<span>:</span>${_minute}<span>:</span>${_second}`
      let dateStr = `${_year}年${_month}月${_day}日 星期${weekEnum[_week]}`

      El_timeDisplay_time.html(timeStr)
      El_timeDisplay_date.html(dateStr)
    }, 1000)
  }
}
