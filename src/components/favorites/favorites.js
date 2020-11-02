import { toggleFavInLS, toggleStar } from '../gallery/gallery';
import './favorites.scss';

const renderFavorites = galleryItems => {
  const lsData = JSON.parse(localStorage.getItem('favorites'));

  const favTag = document.querySelector('.favorites__list');
  favTag.innerHTML = '';

  let markup = '';
  galleryItems.forEach(item => {
    if (lsData.includes(String(item.id))) {
      markup += `<div class="favorites__item"><span class="favorites__item--name">${item.name}</span><button data-id=${item.id} class="favorites__item--btn">X</button></div>`;
    }
  });
  favTag.insertAdjacentHTML('beforeend', markup);

  const delBtns = document.querySelectorAll('.favorites__item--btn');
  delBtns.forEach(btn =>
    btn.addEventListener('click', e => {
      btnClickHandler(e.currentTarget.dataset.id, galleryItems);
    }),
  );
};

const btnClickHandler = (id, galleryItems) => {
  toggleFavInLS(id);
  renderFavorites(galleryItems);
  toggleStar(true, document.querySelector(`[data-id="${id}"]`));
};

export default renderFavorites;
