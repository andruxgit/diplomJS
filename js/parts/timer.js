
function timer (){
  
  function timer() {
    let clockWrap = document.querySelector('.timer1');

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
        nowDate = nowDate.getTime() + nowDate.getTimezoneOffset() * 60000;

        let timeBefore = parseInt((dedLine - nowDate) / 1000);
        

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
          clockWrap.querySelector('#days').textContent = "00";
          clockWrap.querySelector('#hours').textContent = "00";
          clockWrap.querySelector('#minutes > span').textContent = "00";
          clockWrap.querySelector('#seconds > span').textContent = "00";


          return;
        }
      }
    }
    timBeforEvent('12/31/2018 00:00:00 AM');

  }
  timer();

}

module.exports = timer;