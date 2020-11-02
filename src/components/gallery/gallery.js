import getItemsMarkup from './getItemsMarkup.hbs';
import './gallery.scss';
import renderFavorites from '../favorites/favorites';

const renderGallery = galleryItems => {
  const lsData = JSON.parse(localStorage.getItem('favorites'));
  const galleryTag = document.querySelector('.gallery__wrapper');

  const markup = getItemsMarkup(galleryItems);
  galleryTag.insertAdjacentHTML('beforeend', markup);

  const stars = document.querySelectorAll('.item__foto svg');

  stars.forEach(star => {
    const inFav = lsData.find(item => item === star.dataset.id);
    inFav
      ? star.firstElementChild.classList.add('filled')
      : star.firstElementChild.classList.remove('filled');

    star.addEventListener('click', e => {
      favClickHandler(e.currentTarget, galleryItems);
    });
  });
};

const favClickHandler = (star, galleryItems) => {
  const isInLS = toggleFavInLS(star.dataset.id);

  toggleStar(isInLS, star);
  //rerender FavoritesList
  renderFavorites(galleryItems);
};

export const toggleFavInLS = id => {
  const lsData = JSON.parse(localStorage.getItem('favorites'));
  const inFav = lsData.find(item => item === id);
  if (inFav) {
    localStorage.setItem(
      'favorites',
      JSON.stringify(lsData.filter(idx => idx !== id)),
    );
  } else {
    lsData.push(id);
    lsData.sort((a, b) => a - b);
    localStorage.setItem('favorites', JSON.stringify(lsData));
  }
  return inFav;
};

export const toggleStar = (isInLS, starNode) => {
  isInLS
    ? starNode.firstElementChild.classList.remove('filled')
    : starNode.firstElementChild.classList.add('filled');
};

export default renderGallery;
