window.addEventListener('DOMContentLoaded', function () {
  'use strict';
  let dataWindowObj = {};
  let tabs = require('../js/parts/tabs.js'),
  modal = require('../js/parts/modal.js'),
  form = require('../js/parts/form.js'),
  calc = require('../js/parts/calc.js'),
  timer = require('../js/parts/timer.js'),
  big_image = require('../js/parts/big_image.js');


  tabs();
  modal(dataWindowObj);
  form(dataWindowObj);
  calc(dataWindowObj);
  timer();
  form();
  big_image();

});