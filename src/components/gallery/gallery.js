import getGridItemsMarkup from './getGridItemsMarkup.hbs';
import getListItemsMarkup from './getListItemsMarkup.hbs';
import './gallery.scss';
import renderFavorites from '../favorites/favorites';
import openModal from '../itemModal/itemModal';

const renderGallery = galleryItems => {
  const lsData = JSON.parse(localStorage.getItem('favorites'));
  const view = JSON.parse(localStorage.getItem('view'));
  const galleryTag = document.querySelector('.gallery__wrapper');
  galleryTag.innerHTML = '';

  let markup;
  view === 'grid'
    ? (markup = getGridItemsMarkup(galleryItems))
    : (markup = getListItemsMarkup(galleryItems));
  galleryTag.insertAdjacentHTML('beforeend', markup);

  const stars = document.querySelectorAll('.starSvg');

  stars.forEach(star => {
    const inFav = lsData.find(item => item === star.dataset.id);
    inFav
      ? star.firstElementChild.classList.add('filled')
      : star.firstElementChild.classList.remove('filled');

    star.addEventListener('click', e => {
      favClickHandler(e.currentTarget.dataset.id, galleryItems);
    });
  });

  const items = document.querySelectorAll('.gallery__item');
  items.forEach(item =>
    item.addEventListener('click', e => {
      if (e.target.nodeName === 'svg' || e.target.nodeName === 'polygon')
        return;
      openModal(e.currentTarget.dataset.itemid, galleryItems);
    }),
  );
};

export const favClickHandler = (id, galleryItems) => {
  const isInLS = toggleFavInLS(id);

  toggleStar(isInLS, id);

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

export const toggleStar = (isInLS, id) => {
  const starNodes = document.querySelectorAll(`[data-id="${id}"]`);

  isInLS
    ? starNodes.forEach(node =>
        node.firstElementChild.classList.remove('filled'),
      )
    : starNodes.forEach(node => node.firstElementChild.classList.add('filled'));
};

export default renderGallery;
