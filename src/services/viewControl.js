import renderGallery from '../components/gallery/gallery';

const addViewControl = galleryItems => {
  const gridBtn = document.querySelector('.gridBtn');
  const listBtn = document.querySelector('.listBtn');

  [gridBtn, listBtn].forEach(btn =>
    btn.addEventListener('click', () => {
      const genreFilter = document.querySelector('.gallery__control--select')
        .value;

      localStorage.setItem('view', JSON.stringify(btn.dataset.view));
      renderGallery(galleryItems, genreFilter);
    }),
  );
};

export default addViewControl;
