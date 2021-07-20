import '../common/common.js'
import '../../styles/pages/home.scss'
import $ from 'jquery';

$('.btn-arrow-right').on('click', toggleAside)

// 方法
// 设置侧边栏显示/隐藏
function toggleAside () {
  $('.aside').toggleClass('showAside')
}
