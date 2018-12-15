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
    modalEngineer = document.querySelector(classWindow),
    popupClose = modalEngineer.querySelector('.popup_close'),
    close = modalEngineer.querySelector('strong');


headerBtn.addEventListener('click', () => {
   modalEngineer.style.display = 'flex';
});

modalEngineer.addEventListener('click', (event) => {
 let target = event.target || event.srcElement;
     if(target != modalEngineer && target != popupClose && target != close) {
         modalEngineer.style.display = 'flex';
     }else {
         modalEngineer.style.display = 'none';
      
     }
});
}
  getHeaderModal('.popup_engineer_btn', '.popup_engineer');

  getHeaderModal('.contact_us', '.popup');
  

  //******************************* */
  // form
  function myRequest(form, url = '../server.php') {
    //control input phone
    let reNum = /[-\.;":'*a-zA-Zа-яА-Я]/;

    let inputPhone = form.querySelectorAll('input')[1];
    inputPhone.addEventListener('keyup', function () {
      this.value = this.value.replace(reNum, '');
      inputPhone.value = this.value;
    });

    //message alert
    function validMessage(str) {
      let validMsg = document.createElement('div'),
        formInput = form.getElementsByTagName('h2')[0];
      formInput.appendChild(validMsg);
      validMsg.textContent = str;
      validMsg.style.color = 'red';

      setTimeout(() => {
        formInput.removeChild(validMsg);
      }, 3000);
    }

    // send data
    form.addEventListener('submit', function (event) {

      event.preventDefault();

      // valid form
      let rePhone = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
        reMail = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/,
        reText = /^[^a-я,a-z]{1,}$/i;

      let input = form.getElementsByTagName('input'),
        valid = true;
      //  перебираем все возможные инпуты
      for (let i = 0; i < input.length; i++) {
        // if (input[i].type == "text" && (valid)) {
        //   valid = !(reText.test(input[i].value)) && String(input[i].value).length < 15;
        //   if (!valid) {
        //     validMessage('Неверные данные имени');
        //     for (let i = 0; i < input.length; i++) {
        //       input[i].value = '';
        //     }
        //   }
        // }
        if (input[i].type == "tel" && (valid)) {
          valid = rePhone.test(input[i].value);
          if (!valid) {
            validMessage('Неверные данные телефона');
            for (let i = 0; i < input.length; i++) {
              input[i].value = '';
            }
          }
        }
        if (input[i].type == "email" && (valid)) {
          valid = reMail.test(input[i].value) ? true : false;
          if (!valid) {
            validMessage('Неверные данные почты');
            for (let i = 0; i < input.length; i++) {
              input[i].value = '';
            }
          }
        }
      }
      if (valid) {
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
                console.log('отправка');
              } else if (request.readyState === 4 && request.status == 200) {
                resolve();
                console.log('успех');
              } else {
                reject();
                console.log('ошибка');
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
      }
    });
  }

  // Отправка сообщения для модального окна
function sendDataForm (){
  let form = document.querySelectorAll('.form');
  for (let i= 0; i< form.length;i++){
    console.log(form[i])

    myRequest(form[i], '../server.php');
  }
}

sendDataForm();

})