const $ = el => document.querySelector(el);

const watch = $('.play__button'),
    play = $('.video__content-icon'),
    content = $('.video__content'),
    pause = $('.video__pause'),
    mute = $('.video__mute-volume_icon'),
    onmute = $('.video__volume'),
    current = $('.video__current'),
    videoDuration = $('.video__duration'),
    video = $('.video__src'),
    range = $('.video__content-range_front'),
    rangeParent = $('.video__content-range'),
    volumeEl = $('.video__content-volume'),
    volumeFront = $('.video__content-volume_front');

/*----------------- время продолжения---------- */
video.addEventListener('loadedmetadata', () => {
    const durTime = video.duration
    videoDuration.innerHTML = timeDecoder(durTime);
})
/* ----------------------------------------- */


/* -----------------кнопки -----------------*/
watch.addEventListener('click', function () {
    this.style.display = 'none';
    content.style.display = 'flex';
})

play.addEventListener('click', function () {
    play.style.display = 'none';
    pause.style.display = 'flex';
    video.play();
})

pause.addEventListener('click', function () {
    pause.style.display = 'none';
    play.style.display = 'flex';
    video.pause();
})

mute.addEventListener('click', function () {
        mute.style.display = 'none';
        onmute.style.display = 'block';
        video.volume = 0;
})

onmute.addEventListener('click', function () {
        mute.style.display = 'block';
        onmute.style.display = 'none';
        video.volume = 1;
})
/* ----------------Событие мыши--------------- */
// let lineFlag = false;
// rangeParent.addEventListener('mousedown', function (e) {
//     lineFlag = true;
//     volume = video.volume;
// })
// window.addEventListener('mousemove', function (e) {
//     if(lineFlag){
//         const { offsetX } = e;
//         const  parentWidth = rangeParent.clientWidth;
//         const percent = 100 * offsetX / parentWidth;
//         video.currentTime = video.duration * percent / 100;
//         video.volume = 0;
//         let pos = document.querySelectorAll('.d-none');
//         for(let i = 0; i < pos.length; i++) {
//             pos[i].style.display = 'none';
//         }
//     }
// })
// window.addEventListener('mouseup', function () {
//     lineFlag = false;
//     video.volume = 1;
//     let pos = document.querySelectorAll('.d-none');
//     for(let i = 0; i < pos.length; i++) {
//         pos[i].style.display = 'block';
//     }
// })
/* --------------------------------------------- */
function speedUp() {
    video.play();
    video.playbackRate = 2;
}

function slowDown() {
    video.play();
    video.playbackRate = 0.5;
}

function normalSpeed() {
    video.play();
    video.playbackRate = 1;
}

video.addEventListener('volumechange', function() {
    const percent = Math.floor(this.volume * 100);
    volumeFront.style.width = percent + '%';
    localStorage.volume = this.volume;
})

volumeEl.addEventListener('wheel', function(e) {
    console.log(e);
    e.preventDefault();
    const { deltaY } = e;
    if(deltaY > 0) {
        if(video.volume > 0.1001) video.volume -= 0.1;
        else video.volume = 0;
    }else if(deltaY < 0) {
        if(video.volume > 0.999) video.volume = 1;
        else video.volume += 0.1;
    } 
})
/* ------------------------------------ */

rangeParent.addEventListener('click', function (eventInfo) {
    const clickX = eventInfo.offsetX;
    const lineWidth = this.clientWidth;
    const percent = 100 * clickX / lineWidth;
    range.style.width = percent + '%';
    video.currentTime = video.duration * percent / 100;
})

video.addEventListener('timeupdate', function () {
    range.style.width = 100 * this.currentTime / this.duration + '%';
    current.innerHTML = timeDecoder(this.currentTime);
})

/* ----------------Перемешение полосы------------------ */




/* -------------------Расчет времени------------- */
function timeDecoder(seconds) {
    let sec = Math.floor(seconds % 60),
        hour = Math.floor(seconds / 60 / 60),
        min = Math.floor(seconds / 60) - (hour * 60);

    min = min < 10 ? `0${min}` : min;
    sec = sec < 10 ? `0${sec}` : sec;

    const hms = hour > 0 ? `${hour}:${min}:${sec}` : `${min}:${sec}`;
    return hms

}

/* --------------Бургер меню кнопка---------------- */
 const burgerMenu = $('.burger__menu'),
       navList = $('.header__list'),
       headerContent = $('.header__content');
       
       burgerMenu.addEventListener('click', function () {
          navList.classList.toggle('active');
          headerContent.classList.toggle('active');
       })
 
