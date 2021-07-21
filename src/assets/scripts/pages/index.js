import '../common/common.js'
import '../../styles/pages/home.scss'
import asideHtml from '../../../pages/home/aside.html'
import mainHtml from '../../../pages/home/main.html'
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
}
// 设置侧边栏显示/隐藏
function toggleAside () {
  El_container.toggleClass('showAside')
}
