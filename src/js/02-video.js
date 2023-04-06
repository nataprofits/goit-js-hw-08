
import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Player('vimeo-player');
const localStorageKey = 'videoplayer-current-time';

// Сохраняем текущее время в локальное хранилище
const saveCurrentTime = throttle((currentTime) => {
  localStorage.setItem(localStorageKey, currentTime);
}, 1000);

// Получаем время воспроизведения из локального хранилища
const getSavedTime = () => {
  const savedTime = localStorage.getItem(localStorageKey);
  return savedTime ? Number(savedTime) : 0;
};

// Восстанавливаем позицию воспроизведения из локального хранилища
player.setCurrentTime(getSavedTime());

// Сохраняем текущую позицию воспроизведения в локальное хранилище при обновлении времени
player.on('timeupdate', ({ seconds }) => {
  saveCurrentTime(seconds);
});