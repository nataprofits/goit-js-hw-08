import Vimeo from '@vimeo/player';
import throttle from "lodash.throttle";

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

player.on('timeupdate', _.throttle(function() {
  localStorage.setItem('vimeo-player-current-time', player.getCurrentTime());
}, 1000));

    player.getVideoTitle().then(function(title) {
        console.log('title:', title);
    });
const savedTime = localStorage.getItem('vimeo-player-current-time');
if (savedTime) {
  player.setCurrentTime(savedTime);
}