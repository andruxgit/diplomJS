
function modal(){
//modal windows
function getHeaderModal(classBtn, classWindow) {

  let headerBtn = document.querySelector(classBtn),
    modal = document.querySelector(classWindow),
    popupClose = modal.querySelector('.popup_close'),
    close = modal.querySelector('strong');

    function clearDataObj(obj) {
      for (let key in obj) {
        delete obj[key];
      }
    }

  headerBtn.addEventListener('click', (event) => {
    event.preventDefault();
    modal.style.display = 'flex';
  });

  modal.addEventListener('click', (event) => {
    let target = event.target
    if (target != modal && target != popupClose && target != close) {
      // modal.style.display = 'flex';
    } else {
      modal.style.display = 'none';
      clearDataObj(dataWindowObj);

    }
  });
  //timeout show modal popup
  setTimeout(()=>{
    document.querySelector('.popup').style.display = 'flex'
  }, 60000);

}
getHeaderModal('.popup_engineer_btn', '.popup_engineer');

getHeaderModal('.contact_us', '.popup');

getHeaderModal('.feedback_block', '.popup');
  
}

module.exports = modal;