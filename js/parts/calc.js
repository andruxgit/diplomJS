function calc(dataWindowObj) {
  //calc

  function calc(dataWindowObj) {
    let calcShowBtn = document.querySelectorAll('.popup_calc_btn'),
      modalCalc = document.querySelector('.popup_calc'),
      popupCalcClose = modalCalc.querySelector('.popup_calc_close'),
      popupCalcCloseCh = modalCalc.querySelector('strong'),
      widthInput = modalCalc.querySelector('#width'),
      heightInput = modalCalc.querySelector('#height'),

      popupCalcBtn = modalCalc.querySelector('.popup_calc_button'),
      balconIconsWrap = modalCalc.querySelectorAll('.balcon_icons > a > img'),
      balconView = modalCalc.querySelectorAll('.big_img > img'),
      modalCalcInputs = modalCalc.querySelectorAll('.form-control');

    function clearDataObj(obj) {
      for (let key in obj) {
        delete obj[key];
      }
    }

    function clearInput(form) {
      let inputs = form.getElementsByTagName('input');
      for (let i = 0; i < inputs.length; i++) {

        inputs[i].value = '';
      }


    }

    function showModalCalc() {
      //default type window
      dataWindowObj.typeWindow = 0;
      //event click on calculation 
      for (let i = 0; i < calcShowBtn.length; i++) {
        calcShowBtn[i].addEventListener('click', (event) => {
          modalCalc.style.display = 'flex';

        })
      }
    }

    function hideModalCalc() {
      modalCalc.addEventListener('click', (event) => {
        let target = event.target;
        if (target == popupCalcClose || target == popupCalcCloseCh) {
          modalCalc.style.display = 'none';
          //clear data
          clearDataObj(dataWindowObj);
          clearInput(modalCalc);

        }
      });
    }

    function checkbalconIcon() {

      function unsetActivPreview(num) {
        for (let i = 0; i < balconIconsWrap.length; i++) {
          balconIconsWrap[i].classList.remove('do_image_more');
        }
        balconIconsWrap[num].classList.add('do_image_more');
        //window -type
        dataWindowObj.typeWindow = num;
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
          if (!valid) break;
        }

        if (valid) {

          modalCalc.style.display = 'none';
          clearInput(modalCalc);
          showpopupCalcProfile();

        } else {
          let statusMessage = document.createElement('div');
          statusMessage.style.fontSize = "20px";
          statusMessage.style.color = "red";
          statusMessage.textContent = "заполните высоту и ширину";
          modalCalc.querySelector('.popup_calc_content').appendChild(statusMessage);
          setTimeout(() => {
            modalCalc.querySelector('.popup_calc_content').removeChild(statusMessage);
          }, 2000);
        }
      })
    }

    function showpopupCalcProfile() {

      let popupCalcProfile = document.querySelector('.popup_calc_profile');
      popupCalcProfile.style.display = 'flex';
      let calcProfileCheckbox = popupCalcProfile.querySelectorAll('.checkbox'),
        calcProfileSelect = popupCalcProfile.querySelector('.form-control'),
        popupCalcProfileBtn = popupCalcProfile.querySelector('.popup_calc_profile_button'),
        popupCalcProfileClose = popupCalcProfile.querySelector('.popup_calc_profile_close');

      calcProfileTempChekNull();
      dataWindowObj['temperature'] = ''; //по умолчанию
      dataWindowObj['profileType'] = calcProfileSelect.value; //по умолчанию

      function hideModalProfile() {
        popupCalcProfile.addEventListener('click', (event) => {
          let target = event.target;

          if (target == popupCalcProfileClose || target == popupCalcProfile.querySelector('strong')) {
            popupCalcProfile.style.display = 'none';
            //clear data
            clearDataObj(dataWindowObj);
            clearInput(popupCalcProfile);
          }
        });
      }

      function calcProfileTempChekNull() {
        calcProfileCheckbox[0].checked = false;
        calcProfileCheckbox[1].checked = false;
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
              clearInput(popupCalcProfile);

            } else {
              let statusMessage = document.createElement('div');
              statusMessage.style.fontSize = "20px";
              statusMessage.style.color = "red";
              statusMessage.textContent = "Надо выбрать опции тепла";
              popupCalcProfile.querySelector('.popup_calc_profile_content ').appendChild(statusMessage);
              setTimeout(() => {
                popupCalcProfile.querySelector('.popup_calc_profile_content ').removeChild(statusMessage);
              }, 2000);
            }
          })
        } //end showCalcEnd
        function hideModalCalcEnd() {
          calcEnd.addEventListener('click', (event) => {
            let target = event.target;
            if (target == popupCalcEndClose || target == popupCalcEndClose.querySelector('strong')) {
              calcEnd.style.display = 'none';
              //clear data
              clearDataObj(dataWindowObj);
              clearInput(calcEnd);

            }
          });
        }

        showCalcEnd();
        hideModalCalcEnd();


      } // end  nexToCalcEnd();
      // 
      hideModalProfile();
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

  }

  calc(dataWindowObj);
}

module.exports = calc;