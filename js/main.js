window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  //Tabs
  let classTab = document.querySelectorAll('.decoration_item'),
    // classTabLink = document.querySelectorAll('.decoration_item div>a'),
    classWrapTab = document.querySelectorAll('.decoration_slider')[0],
    classTabContentItem = document.querySelectorAll('.content_tab'),
    classTabActive = classWrapTab.querySelectorAll('.decoration_item > div');


  function hideContent(num) {
    for (let i = num; i < classTabContentItem.length; i++) {
      classTabContentItem[i].classList.remove('show');
      classTabContentItem[i].classList.add('hide');

    }
  }

  function unsetActivTab(num) {
    for (let i = 0; i < classTabActive.length; i++) {
      classTabActive[i].classList.remove('after_click');
    }
    classTabActive[num].classList.add('after_click');
  }

  function showContent(num) {
    hideContent(0);
    classTabContentItem[num].classList.add('show');
  }

  function tabClick() {
    classWrapTab.addEventListener('click', (event) => {
      let target = event.target;
      if (target && target) {
        for (let i = 0; i < classTab.length; i++) {
          if (target && (classWrapTab.getElementsByTagName('a')[i] == target || classWrapTab.getElementsByClassName('no_click')[i] == target)) {
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
     if(target != modal && target != popupClose && target != close) {
         modal.style.display = 'flex';
     }else {
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
            let json = JSON.stringify(obj);
            request.send(json);
            request.addEventListener('readystatechange', function () {
              if (request.readyState < 4) {
                resolve();
              } else if (request.readyState === 4 && request.status == 200) {
                resolve();
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

        postdata(form).then(() => {
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

  // Отправка сообщения для модального окна
function sendDataForm (){
  let form = document.querySelectorAll('.form');
  for (let i= 0; i< form.length;i++){

    myRequest(form[i], '../server.php');
  }
}

sendDataForm();

})