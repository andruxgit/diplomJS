window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  //Tabs
  function tabs(tab, wrapTab, tabContentItem, tabActive, classActiv) {

    let classTab = document.querySelectorAll(tab),
      classWrapTab = document.querySelectorAll(wrapTab)[0],
      classTabContentItem = document.querySelectorAll(tabContentItem),
      classTabActive = classWrapTab.querySelectorAll(tabActive);

    function hideContent(num) {
      for (let i = num; i < classTabContentItem.length; i++) {
        classTabContentItem[i].style.display = 'none';
      }
    }

    function unsetActivTab(num) {
      for (let i = 0; i < classTabActive.length; i++) {
        classTabActive[i].classList.remove(classActiv);
      }
      classTabActive[num].classList.add(classActiv);
    }

    function showContent(num) {
      hideContent(0);
      classTabContentItem[num].style.display = 'flex';
    }

    function tabClick() {
      classWrapTab.addEventListener('click', (event) => {
        let target = event.target;
        if (target) {
          for (let i = 0; i < classTab.length; i++) {

            if (target && (classWrapTab.getElementsByTagName('a')[i] == target || classWrapTab.getElementsByTagName('img')[i] == target || classWrapTab.getElementsByClassName('no_click')[i] == target || classWrapTab.getElementsByClassName('glazing_block')[i] == target)) {
              hideContent(0);
              showContent(i);
              unsetActivTab(i);
              break;
            }
          }
        }
      })
    }

    hideContent(1);
    tabClick();
  }

  tabs('.decoration_item', '.decoration_slider', '.content_tab', '.decoration_item > div', 'after_click');
  tabs('.glazing_block', '.glazing_slider', '.glazing > div > div.row', '.glazing_block > a', 'glazing_activ');

  //modal windows
  function getHeaderModal(classBtn, classWindow) {

    let headerBtn = document.querySelector(classBtn),
      modal = document.querySelector(classWindow),
      popupClose = modal.querySelector('.popup_close'),
      close = modal.querySelector('strong');


    headerBtn.addEventListener('click', (event) => {
      event.preventDefault();
      modal.style.display = 'flex';
    });

    modal.addEventListener('click', (event) => {
      let target = event.target
      if (target != modal && target != popupClose && target != close) {
        modal.style.display = 'flex';
      } else {
        modal.style.display = 'none';

      }
    });
  }
  getHeaderModal('.popup_engineer_btn', '.popup_engineer');

  getHeaderModal('.contact_us', '.popup');

  getHeaderModal('.feedback_block', '.popup');
  //******************************* */
  // form
  function myRequest(form, url = '../server.php') {
    //control input phone
    let reNum = /^[^1-9]{1}$|[^0-9]/ig;
    let inputPhone = form.querySelectorAll('input')[1];
    inputPhone.addEventListener('keyup', function () {
      inputPhone.value = inputPhone.value.replace(reNum, '');
    });

    function deleteDataObj(obj) {
      for (let key in obj) {
        delete obj[key];
      }
    }
    // send data
    form.addEventListener('submit', function (event) {

      event.preventDefault();

      //обьект сообщений об событии отправки
      let message = {
        loading: 'Загрузка...',
        sucsess: 'Спасибо скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так...'
      };

      function postdata(formObj) {
        return new Promise(function (resolve, reject) {
          let request = new XMLHttpRequest();
          request.open('POST', url);
          request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

          let formData = new FormData(formObj),
            obj = {};
          formData.forEach(function (value, key) {
            obj[key] = value;
          });
          for (let key in dataWindowObj) {
            obj[key] = dataWindowObj[key];
          }

          let json = JSON.stringify(obj);
          deleteDataObj(dataWindowObj);

          request.send(json);
          request.addEventListener('readystatechange', function () {
            if (request.readyState < 4) {
              resolve();
            } else if (request.readyState === 4 && request.status == 200) {
              console.dir(json)
              resolve(json);
            } else {
              reject();
            }
          });
        });

      } //end post data
      let headModal = form.getElementsByTagName('h2')[0];
      let startText = headModal.textContent,
        oldColor = headModal.style.color,
        oldFontSize = headModal.style.fontSize;

      postdata(form, dataWindowObj).then(() => {
        headModal.innerHTML = message.loading;
        headModal.style.color = "yellow";
        headModal.style.fontSize = "22px";
      }).then(() => {
        headModal.innerHTML = message.sucsess;
        headModal.style.color = "green";
        headModal.style.fontSize = "28px";

      }).catch(() => {
        headModal.innerHTML = message.failure;
        headModal.style.color = "red";
        headModal.style.fontSize = "25px";
      }).then(() => {
        //очистка сообщения
        setTimeout(() => {
          let input = form.getElementsByTagName('input');
          headModal.innerHTML = startText;
          headModal.style.color = oldColor;
          headModal.style.fontSize = oldFontSize;

          for (let i = 0; i < input.length; i++) {
            input[i].value = '';
          }
        }, 3000);
      });

    });
  } //end form

  // Отправка сообщения для модальных окон
  function sendDataForm() {
    let form = document.querySelectorAll('.form');
    for (let i = 0; i < form.length; i++) {

      myRequest(form[i], '../server.php');

    }
  }
  sendDataForm();

  //calc

  function calc() {
    let calcShowBtn = document.querySelectorAll('.popup_calc_btn'),
      modalCalc = document.querySelector('.popup_calc'),
      popupCalcClose = modalCalc.querySelector('.popup_calc_close'),
      popupCalcCloseCh = modalCalc.querySelector('strong'),
      widthInput = modalCalc.querySelector('#width'),
      heightInput = modalCalc.querySelector('#height'),

      popupCalcBtn = modalCalc.querySelector('.popup_calc_button'),
      balconIconsWrap = modalCalc.querySelectorAll('.balcon_icons > a > img'),
      balconView = modalCalc.querySelectorAll('.big_img > img'),
      modalCalcInputs = modalCalc.querySelectorAll('.form-control'),

      dataWindowObj = {};

    function showModalCalc() {
      for (let i = 0; i < calcShowBtn.length; i++) {
        calcShowBtn[i].addEventListener('click', (event) => {
          modalCalc.style.display = 'flex';
        })
      }
    }

    // && target == popupCalcBtn
    function hideModalCalc() {
      modalCalc.addEventListener('click', (event) => {
        let target = event.target
        if (target == popupCalcClose || target == popupCalcCloseCh) {
          modalCalc.style.display = 'none';
        }
      });
    }

    function checkbalconIcon() {
      function unsetActivPreview(num) {
        for (let i = 0; i < balconIconsWrap.length; i++) {
          balconIconsWrap[i].classList.remove('do_image_more');
        }
        balconIconsWrap[num].classList.add('do_image_more');
        dataWindowObj['view'] = num;
      }

      function showBalconView(num) {
        hideBalconView(0);
        balconView[num].style.display = 'inline-block';
      }
      for (let i = 0; i < balconIconsWrap.length; i++) {
        balconIconsWrap[i].addEventListener('click', (event) => {
          event.preventDefault();
          unsetActivPreview(i);
          showBalconView(i);
        })
      }
    }

    function hideBalconView(num) {
      for (let i = num; i < balconView.length; i++) {
        balconView[i].style.display = 'none';
      }
    }

    function clearNoNum(input) {
      input.addEventListener('keyup', () => {
        input.value = input.value.replace(/^[^1-9]{1}$|[^0-9]/ig, '');
      });
    }

    function nextToCalcProfile() {

      popupCalcBtn.addEventListener('click', () => {

        let valid = false;
        for (let i = 0; i < modalCalcInputs.length; i++) {

          dataWindowObj[modalCalcInputs[i].id] = modalCalcInputs[i].value;

          valid = (modalCalcInputs[i].value && !modalCalcInputs[i].value == '') ? true : false;
          if (!valid) break
        }

        if (valid) {
          modalCalc.style.display = 'none';
          // modalCalc.querySelector('.popup_calc_content').style.display = 'none';


          showpopupCalcProfile();

        } else {
          let statusMessage = document.createElement('div');
          statusMessage.style.fontSize = "20px"
          statusMessage.style.color = "red"
          statusMessage.textContent = "заполните высоту и ширину"
          modalCalc.querySelector('.popup_calc_content').appendChild(statusMessage);
          setTimeout(() => {
            modalCalc.querySelector('.popup_calc_content').removeChild(statusMessage);
          }, 2000);
        }
      })
    }

    function showpopupCalcProfile() {

      // let popupCalc = document.querySelector('div.popup_calc');
      // popupCalc.style.display = 'none';
      let popupCalcProfile = document.querySelector('.popup_calc_profile');
      popupCalcProfile.style.display = 'flex';
      let calcProfileCheckbox = popupCalcProfile.querySelectorAll('.checkbox'),
        calcProfileSelect = popupCalcProfile.querySelector('.form-control'),
        // popupCalcEnd = popupCalcProfile.querySelector('.popup_calc_end'),
        popupCalcProfileBtn = popupCalcProfile.querySelector('.popup_calc_profile_button'),
        popupCalcProfileClose = popupCalcProfile.querySelector('.popup_calc_profile_close')

      calcProfileTempChekNull();
      dataWindowObj['temperature'] = ''; //по умолчанию
      dataWindowObj['profileType'] = calcProfileSelect.value; //по умолчанию

      function hideModalProfile() {
        popupCalcProfile.addEventListener('click', (event) => {
          let target = event.target;

          if (target == popupCalcProfileClose || target == popupCalcProfile.querySelector('strong')) {
            popupCalcProfile.style.display = 'none';
          }
        });
      }

      function calcProfileTempChekNull() {
        calcProfileCheckbox[0].checked = false
        calcProfileCheckbox[1].checked = false
      }

      function calcProfileTempChek() {
        calcProfileCheckbox[1].addEventListener('click', function (event) {
          calcProfileCheckbox[0].checked = !calcProfileCheckbox[1].checked;
          if (calcProfileCheckbox[0].checked) {
            dataWindowObj['temperature'] = 'cold';
          } else {
            dataWindowObj['temperature'] = 'warm';
          }
        });
        calcProfileCheckbox[0].addEventListener('click', function () {
          calcProfileCheckbox[1].checked = !calcProfileCheckbox[0].checked;
          if (calcProfileCheckbox[1].checked) {
            dataWindowObj['temperature'] = 'warm';
          } else {
            dataWindowObj['temperature'] = 'cold';
          }
        });
      }; //end calcProfileCheckSelect

      function calcProfileTypeSelect() {
        calcProfileSelect.addEventListener('change', () => {
          dataWindowObj['profileType'] = calcProfileSelect.value;
        })
      }

      function nexToCalcEnd() {
        let calcEnd = document.querySelector('.popup_calc_end'),
          popupCalcEndClose = calcEnd.querySelector('.popup_calc_end_close')

        function showCalcEnd() {
          popupCalcProfileBtn.addEventListener('click', (event) => {

            if (dataWindowObj['temperature'] != '' && dataWindowObj['profileType'] != '') {
              calcEnd.style.display = 'flex';
              popupCalcProfile.style.display = 'none';

            } else {
              let statusMessage = document.createElement('div');
              statusMessage.style.fontSize = "20px"
              statusMessage.style.color = "red"
              statusMessage.textContent = "Надо выбрать опции тепла"
              popupCalcProfile.querySelector('.popup_calc_profile_content ').appendChild(statusMessage);
              setTimeout(() => {
                popupCalcProfile.querySelector('.popup_calc_profile_content ').removeChild(statusMessage);
              }, 2000);
            }
          })
        } //end showCalcEnd
        function hideModalCalcEnd() {
          calcEnd.addEventListener('click', (event) => {
            let target = event.target
            if (target == popupCalcEndClose || target == popupCalcEndClose.querySelector('strong')) {
              calcEnd.style.display = 'none';
            }
          });
        }

        function addDataobjToForm() {
          let formCalcEnd = calcEnd.querySelector('.form')

          console.log(dataWindowObj);
          console.log(formCalcEnd);

          let newInput = document.createElement('input');
          newInput.style.display = 'none';

          // for (let key in dataWindowObj){

          //   newInput.name = key
          //   newInput.value = dataWindowObj[key];
          //   formCalcEnd.appendChild(newInput);

          //   console.log('let=' + dataWindowObj[key])
          // }



        }

        showCalcEnd();
        hideModalCalcEnd();
        addDataobjToForm();

      } // end  nexToCalcEnd();
      // 
      hideModalProfile()
      calcProfileTempChek();
      calcProfileTypeSelect();
      nexToCalcEnd();

    }

    showModalCalc();
    hideModalCalc();
    checkbalconIcon();
    clearNoNum(widthInput);
    clearNoNum(heightInput);
    nextToCalcProfile();
    return dataWindowObj
  }
  let dataWindowObj = calc();

  function timer() {
    let clockWrap = document.querySelector('.timer1')

    function timBeforEvent(dedLine) {
      let days = '',
        hours = '',
        minutes = '',
        seconds = '';
      dedLine = new Date(dedLine).getTime();
      if (isNaN(dedLine)) {
        return;
      }

      setInterval(tik, 1000);

      function tik() {
        let nowDate = new Date();
        let timeBefore = parseInt((dedLine - nowDate) / 1000);
        nowDate = nowDate.getTime() + nowDate.getTimezoneOffset() * 60000;
        if (timeBefore >= 0) {

          days = parseInt(timeBefore / 86400);

          timeBefore = (timeBefore % 86400);
          hours = parseInt(timeBefore / 3600);

          timeBefore = (timeBefore % 3600);
          minutes = parseInt(timeBefore / 60);

          seconds = parseInt(timeBefore % 60);

          clockWrap.querySelector('#days').textContent = parseInt(days, 10);
          clockWrap.querySelector('#hours').textContent = ("0" + hours).slice(-2);
          clockWrap.querySelector('#minutes > span').textContent = ("0" + minutes).slice(-2);
          clockWrap.querySelector('#seconds > span').textContent = ("0" + seconds).slice(-2);
        } else {
          return;
        }
      }
    }
    timBeforEvent('12/31/2018 00:00:00 AM');

  }
  timer();

  function showImage() {

    let imagesParent = document.querySelector('.works'),
      images = imagesParent.querySelectorAll('a'),
      body = document.querySelector('body'),
      overlay = document.createElement('div'),
      overleyImg = document.createElement('img');

    let showModalImg = () => {
      for (let i = 0; i < images.length; i++) {

        let bigImg = images[i].getAttribute('href');
        images[i].addEventListener('click', (event) => {
          event.preventDefault();
          body.appendChild(overlay);
          overlay.appendChild(overleyImg);
          overleyImg.src = bigImg;
          overlay.style.cssText = "display: flex;position: fixed; top: 0;left: 0;width: 100%;height: 100%;background-color:rgba(0,0,0,0.8);";                            
          overleyImg.style.cssText = "display:flex; margin: auto; vertical-align: center ";
        });
      }
    };
    function  hideModalI () {
      overlay.addEventListener('click', (event) => {
        let target = event.target;
        if (target == overlay) {
          overlay.style.display = 'none';
        }
      });
    };

    showModalImg();
    hideModalI();
  }
  showImage()


})