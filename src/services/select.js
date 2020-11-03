import renderGallery from '../components/gallery/gallery';

const renderSelect = galleryItems => {
  const allGenres = [];
  for (let i = 0; i < galleryItems.length; i++) {
    for (let k = 0; k < galleryItems[i].genres.length; k++) {
      !allGenres.includes(galleryItems[i].genres[k]) &&
        allGenres.push(galleryItems[i].genres[k]);
    }
  }

  const selectTag = document.querySelector('.gallery__control--select');

  let markup = '<option selected disabled>Select genre</option>';
  allGenres.map(genre => {
    markup += `<option>${genre}</option>`;
  });

  selectTag.innerHTML = markup;

  selectTag.addEventListener('change', e => {
    renderGallery(galleryItems, e.target.value);
  });
};

export default renderSelect;
