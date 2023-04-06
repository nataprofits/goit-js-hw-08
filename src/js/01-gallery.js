// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = document.querySelector('.gallery');

// Создание разметки элементов галереи из массива данных
const galleryMarkup = galleryItems.map(({ preview, original, description }) => `
   <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      alt="${description}"
    />
  </a>
`).join('');

// Вставка разметки в список ul.gallery(html)
gallery.insertAdjacentHTML('beforeend', galleryMarkup);

// Инициализация библиотеки
let instance = new SimpleLightbox('.gallery a', { captions: true,
  captionsData: 'alt',
  animationSpeed: 250,
  docClose: true,
  overlayOpacity:0.7,
  closeOnEscape: true, });
  instance.show();
;