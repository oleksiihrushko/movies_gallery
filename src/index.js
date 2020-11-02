import renderFavorites from './components/favorites/favorites';
import renderGallery from './components/gallery/gallery';
import { getGallery } from './services/api';
import './styles.css';

!localStorage.getItem('favorites') &&
  localStorage.setItem('favorites', JSON.stringify([]));

getGallery().then(result => {
  renderGallery(result);
  renderFavorites(result);
});
