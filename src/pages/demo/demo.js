import '../../assets/scripts/common/common.js'
import './demo.scss'
import $ from 'jquery';

let El_btnToggle = $('.btn-toggle')
let El_menuBox = $('.menu-box')

init()

function init () {
  El_btnToggle.on('click', toggleMenuBox)
}

function toggleMenuBox () {
  El_menuBox.addClass('addTransition')
  El_menuBox.toggleClass('moveLeft')
}
