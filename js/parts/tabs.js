  
  
  
 function tabs (){
    //Tabs
  function tab(tab, wrapTab, tabContentItem, tabActive, classActiv) {

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
  tab('.decoration_item', '.decoration_slider', '.content_tab', '.decoration_item > div', 'after_click');
  tab('.glazing_block', '.glazing_slider', '.glazing > div > div.row', '.glazing_block > a', 'glazing_activ');
 }


  module.exports = tabs;