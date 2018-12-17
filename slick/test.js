let deleteDataObj = () => {
  for (let key in options) {
    delete options[key];
    }
};




 let form = document.querySelectorAll('form'),
 input = document.querySelectorAll('input');

for(let i = 0; i < form.length; i++) {

  form[i].addEventListener('submit', (event) => {
      event.preventDefault();

      let request = new XMLHttpRequest();
      request.open('POST', './server.php');
      request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
      let formData = new FormData(form[i]);
      
      
     formData.forEach(function(value, key) {
      options[key] = value;
     });

     let json = JSON.stringify(options);

     request.send(json);

      request.addEventListener('readystatechange', () => {
         if(request.readyState < 4) {
          swal('Идет отправка');
         }
         else if (request.readyState === 4 && request.status == 200) {
            swal(
              'Отправлено!',
              '',
              'success'
            );
            clear();
            deleteOptions();
         }else {
          swal({
              type: 'error',
              title: 'Oops...',
              text: 'Ошибка!'
            });
            clear();
            deleteOptions();
         }
      });

  }); 

}

for(let i = 0; i < input.length; i++) {
   input[i].addEventListener('keypress', function(e) {
      let key = e.keyCode;
      let atributeName = input[i].getAttribute('name'),
          inputId = input[i].id;

      if(atributeName == 'user_phone' || inputId == 'width' || inputId == 'height') {
         if (key < 48 || key > 57) {
            e.preventDefault();
      }
   }
});
}

























// let showPopupCalc = () => {
//     for (let i = 0; i < popupCalcShow.length; i++) {
//       popupCalcShow[i].addEventListener('click', () => {
//         popupCalc.style.display = 'flex';
//         scrollHide.style.overflow = 'hidden';

//         let popupCalcButton = document.querySelector('.popup_calc_button');
//         popupCalcButton.addEventListener('click', function () {
//           if (inputHeight.value == '' || inputWidth.value == '' || inputHeight.value == '0' || inputWidth.value == '0') {
//             swal({
//               type: 'error',
//               title: 'Oops...',
//               text: 'Введите пожалуйста ширину и высоту окна',
//             });
//           } else {
//             popupCalc.style.display = 'none';
//             popupCalcProfile.style.display = 'flex';
//             options.height = inputHeight.value;
//             options.width = inputWidth.value;
//           }
//         });
//       });
//     }

    // let popupCalcShow = document.querySelectorAll('.popup_calc_btn'),
    // popupCalc = document.querySelector('.popup_calc'),
    // popupCalcProfile = document.querySelector('.popup_calc_profile'),
    // let popupCalcEnd = document.querySelector('.popup_calc_end');
    // inputWidth = document.querySelector('#width'),
    // inputHeight = document.querySelector('#height'),
    // inputSelect = document.querySelector('#view_type'),
    // checkbox = document.querySelectorAll('input[type="checkbox"]'),
    // scrollHide = document.querySelector('html');










    // classTabContentItem[num].classList.add('show');

    // classTabContentItem[i].classList.remove('show');
    // classTabContentItem[i].classList.add('hide');
    // console.log(classTabContentItem[i])



    // classTabActive = document.querySelectorAll(tabContentItem)[0];

    // console.log(classTab);
    // console.log(classWrapTab);
    // console.log(classTabContentItem);
    // console.log(classTabActive);


    // /html/body/section[1]/div/div[3]
    // body > section.glazing > div > div.row
    //message alert
    // function validMessage(str) {
    //   let validMsg = document.createElement('div'),
    //     formInput = form.getElementsByTagName('h2')[0];
    //   formInput.appendChild(validMsg);
    //   validMsg.textContent = str;
    //   validMsg.style.color = 'red';

    //   setTimeout(() => {
    //     formInput.removeChild(validMsg);
    //   }, 3000);
    // }
    // let reNum = /^[^1-9,\+]{1}$|[^0-9,(,)+]/ig;

    //   // valid form
    //   let rePhone = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,

    //   reText = /^[^a-я,a-z]{1,}$/i;

    // let input = form.getElementsByTagName('input'),
    //   valid = true;
    // //  перебираем все возможные инпуты
    // for (let i = 0; i < input.length; i++) {

    // if (input[i].type == "text" && (valid)) {
    //   valid = !(reText.test(input[i].value)) && String(input[i].value).length < 15;
    //   if (!valid) {
    //     validMessage('Неверные данные имени');
    //     for (let i = 0; i < input.length; i++) {
    //       input[i].value = '';
    //     }
    //   }
    // }

    //   if (input[i].type == "tel" && (valid)) {

    //     valid = rePhone.test(input[i].value);
    //     if (!valid) {
    //       validMessage('Неверные данные телефона');
    //       for (let i = 0; i < input.length; i++) {
    //         input[i].value = '';
    //       }
    //     }
    //   }

    // }

    // if (input[i].type == "email" && (valid)) {
    //   valid = reMail.test(input[i].value) ? true : false;
    //   if (!valid) {
    //     validMessage('Неверные данные почты');
    //     for (let i = 0; i < input.length; i++) {
    //       input[i].value = '';
    //     }
    //   }
    // }
    //
    // reMail = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/,
    // let reNum = /[-\.;":'*a-zA-Z]/;
    // persons.addEventListener('keyup', function () {

    //  this.value = this.value.replace(reNum, '');
    //  persons.value = this.value;
    // });


    // let reNum = /^[^1-9]{1}$|[^0-9+]/ig;

    // persons.addEventListener('keyup', () => {
    //   persons.value = persons.value.replace(reNum, '');
    // });
    // restDays.addEventListener('keyup', () => {
    //   restDays.value = restDays.value.replace(reNum, '');
    // });

    // let rePhone = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
    // reMail = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/,
    // reText = /^[^a-я,a-z]{1,}$/i;

    // if (input[i].type == "text" && (valid)) {
    //   valid = !(reText.test(input[i].value)) && String(input[i].value).length < 15;
    //   if (!valid) {
    //     validMessage('Неверные данные имени');
    //     for (let i = 0; i < input.length; i++) {
    //       input[i].value = '';
    //     }
    //   }
    // }

    //  перебираем все возможные инпуты
    //  for (let i = 0; i < input.length; i++) {

    //   if (input[i].type == "tel" && (valid)) {
    //     valid = rePhone.test(input[i].value);
    //     if (!valid) {
    //       validMessage('Неверные данные телефона');
    //       for (let i = 0; i < input.length; i++) {
    //         input[i].value = '';
    //       }
    //     }
    //   }
    //   if (input[i].type == "email" && (valid)) {
    //     valid = reMail.test(input[i].value) ? true : false;
    //     if (!valid) {
    //       validMessage('Неверные данные почты');
    //       for (let i = 0; i < input.length; i++) {
    //         input[i].value = '';
    //       }
    //     }
    //   }
    // }





    //присвоение стилей элементу

    //  classTab[num].style.outline = 'none';
    //  let  a = classTab[num].querySelector('div>a');
    //  a.style.border = 'none';
    //  a.style.color = '#0089cd';  
    //scrollHide.style.overflow = 'scroll';

    //form
    // function formRequest(form, url = '../server.php') {


    //   if (true) {
    //     function postData(objForm) {
    //       return new Promise(function (resolve, reject) {
    //         request.open('POST', url);
    //         let request = new XMLHttpRequest();

    //         request.setRequestHeader('Content-Type', 'application/json; charset = utf-8');

    //         let formData = new FormData(objForm),
    //           obj = {};
    //         formData.forEach(function (value, key) {
    //           obj[key] = value;
    //         });
    //         let json = JSON.stringify(obj);
    //         request.send(json);

    //         request.addEventListener('readystatechange', function () {
    //           if (request.readyState < 4) {
    //             resolve();
    //           } else if (request.readyState === 4 && request.status == 200) {
    //             resolve()
    //           } else {
    //             reject();
    //           }

    //         })
    //       })
    //     }


    //   //end post data

    //   let message = {
    //     loading: 'Загрузка...',
    //     sucsess: 'Спасибо скоро мы с вами свяжемся!',
    //     failure: 'Что-то пошло не так...'
    //   };
    //   // let input = form.getElementsByTagName('input');
    let statusMessage = document.createElement('div');
    statusMessage.style.fontSize = "20px"
    statusMessage.style.color = "red"
    form.appendChild(statusMessage);

    // let headModal = form.getElementsByTagName('h2')[0];
    // console.log(headModal)

    //   postData(form).then(() => {
    //     // statusMessage.innerHTML = message.loading;
    //     // headModal.innerHTML = message.loading;
    //   }).then(() => {
    //     // statusMessage.innerHTML = message.sucsess;
    //     // headModal.innerHTML = message.loading;
    //   }).catch(() => {
    //     // statusMessage.innerHTML = message.failure;
    //     // headModal.innerHTML = message.loading;
    //   }).then(() => {
    //     // очистка инпутов
    //     // for (let i = 0; i < input.length; i++) {
    //     //   input[i].value = '';
    //     // }
    //   });

    // }
    // }

    // let formPopupEngineer = document.querySelector('.popup_engineer');
    // formRequest(formPopupEngineer);

    // let reText = /^[\W]{2,20}$/i;
    // str = "Андрей"


    // console.log(reText.test(str))

    // function testinput(re, str){
    //   var midstring;
    //   if (re.test(str)) {
    //     midstring = ' содержит ';
    //   } else {
    //     midstring = ' не содержит ';
    //   }
    //   console.log(str + midstring + re.source);
    // }
    // testinput(/^[^\d]{2,15}$/, '555');


    // let input = form.getElementsByTagName('input');
    // let valid = true;
    //  перебираем все возможные инпуты
    // for (let i = 0; i < input.length; i++) {

    // console.log('lenght-' + input.length)  


    // let reText = /^[a-я,a-z]{2,7}$/i;

    // let valid = reText.test('a');

    // if (valid) {
    //   console.log('Неверные данные имени');
    // }

    // console.log(true && false)

    // console.log(true && true)
    // let s = true || false
    // console.log( s)