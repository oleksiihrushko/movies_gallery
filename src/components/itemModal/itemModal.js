import './itemModal.scss';
import getModalMarkup from './itemModal.hbs';
import { getItem } from '../../services/api';
import { favClickHandler } from '../gallery/gallery';

const modalTag = document.querySelector('.modal');

const openModal = (id, galleryItems) => {
  getItem(id).then(item => {
    const markup = getModalMarkup(item);

    modalTag.innerHTML = markup;
    modalTag.classList.remove('hidden');

    const closeBtn = document.querySelector('.modal__closeBtn');
    closeBtn.addEventListener('click', closeModal);

    //init star fill, if this movie in favorites
    const star = document.querySelector('.modal__star');
    const lsData = JSON.parse(localStorage.getItem('favorites'));
    const isInLs = lsData.find(item => item === id);
    isInLs
      ? star.firstElementChild.classList.add('filled')
      : star.firstElementChild.classList.remove('filled');

    star.addEventListener('click', e => {
      favClickHandler(e.currentTarget.dataset.id, galleryItems);
    });
  });
};

const closeModal = () => {
  modalTag.classList.add('hidden');
  modalTag.innerHTML = '';
};

export default openModal;
