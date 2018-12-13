window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  //Tabs
  let classTab = document.querySelectorAll('.decoration_item'),
   classTabLink = document.querySelectorAll('.decoration_item div>a'),
    classWrapTab = document.querySelectorAll('.decoration_slider')[0],
    classTabContentItem = document.querySelectorAll('.content_tab'),
    classTabActive = classWrapTab.querySelectorAll('.decoration_item > div');
  // console.log(classTabActive)

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
    //  classTab[num].style.outline = 'none';
    //  let  a = classTab[num].querySelector('div>a');
    //  a.style.border = 'none';
    //  a.style.color = '#0089cd';  
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
  function getHeaderModal (classBtn,classWindow){
    let headerBtn = document.querySelectorAll(classBtn)[0],
    modal = document.querySelectorAll(classWindow)[0],
    close = modal.querySelectorAll('.popup_close')[0];
  
    headerBtn.addEventListener('click', (event) => {
      modal.classList.add('show');
    })

    close.addEventListener('click', (event) => {
      modal.classList.remove('show');
    })
  }

  getHeaderModal ('.popup_engineer_btn','.popup_engineer');

  getHeaderModal ('.contact_us','.popup');

  //form

 // Request a call
 



})