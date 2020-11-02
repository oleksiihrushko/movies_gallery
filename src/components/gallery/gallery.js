import { getGallery } from '../../services/api';
import galleryItems from './galleryItems.hbs';
import './gallery.scss';

const renderGallery = async lsData => {
  const result = await getGallery();
  const markup = galleryItems(result);
  document
    .querySelector('.gallery__wrapper')
    .insertAdjacentHTML('beforeend', markup);

  const stars = document.querySelectorAll('.item__foto svg');

  stars.forEach(star => {
    const inFav = lsData.find(item => item === star.dataset.id);
    inFav
      ? star.firstElementChild.classList.add('filled')
      : star.firstElementChild.classList.remove('filled');

    star.addEventListener('click', e => {
      favClickHandler(e.currentTarget);
    });
  });
};

const favClickHandler = star => {
  const lsData = JSON.parse(localStorage.getItem('favorites'));
  const inFav = lsData.find(item => item === star.dataset.id);

  if (inFav) {
    localStorage.setItem(
      'favorites',
      JSON.stringify(lsData.filter(idx => idx !== star.dataset.id)),
    );
    star.firstElementChild.classList.remove('filled');
  } else {
    lsData.push(star.dataset.id);
    lsData.sort((a, b) => a - b);
    localStorage.setItem('favorites', JSON.stringify(lsData));
    star.firstElementChild.classList.add('filled');
  }
};

export default renderGallery;
