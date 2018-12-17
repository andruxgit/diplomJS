function form (dataWindowObj){
// form
function myRequest(form, url = '../server.php') {
  //control input phone
  let reNum = /^[^1-9]{1}$|[^0-9]/ig;
  let inputPhone = form.querySelectorAll('input')[1];
  inputPhone.addEventListener('keyup', function () {
    inputPhone.value = inputPhone.value.replace(reNum, '');
  });

  function clearDataObj(obj) {
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


        for (let key in obj) {
          dataWindowObj[key] = obj[key];
        }
       

        let json = JSON.stringify(dataWindowObj);

       
        request.send(json);
        //clear data
        clearDataObj(dataWindowObj);

        request.addEventListener('readystatechange', function () {
          if (request.readyState < 4) {
            resolve();
          } else if (request.readyState === 4 && request.status == 200) {
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

// Отправка сообщения для модальных окон
function sendDataForm() {
  let form = document.querySelectorAll('.form');
  for (let i = 0; i < form.length; i++) {

    myRequest(form[i], '../server.php');
    

  }
}
sendDataForm(dataWindowObj);

}

module.exports = form;