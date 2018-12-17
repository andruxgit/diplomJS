
function big_image(){

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

    function hideModalI() {
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
}

module.exports = big_image;