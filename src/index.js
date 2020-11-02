import renderFavorites from './components/favorites/favorites';
import renderGallery from './components/gallery/gallery';
import './styles.css';

!localStorage.getItem('favorites') &&
  localStorage.setItem('favorites', JSON.stringify([]));
const favInLS = JSON.parse(localStorage.getItem('favorites'));

renderGallery(favInLS);
renderFavorites(favInLS);
