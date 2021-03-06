import renderFavorites from './components/favorites/favorites';
import renderGallery from './components/gallery/gallery';
import { getGallery } from './services/api';
import renderSelect from './services/select';
import addViewControl from './services/viewControl';
import './styles.css';

!localStorage.getItem('favorites') &&
  localStorage.setItem('favorites', JSON.stringify([]));

!localStorage.getItem('view') &&
  localStorage.setItem('view', JSON.stringify('grid'));

getGallery().then(result => {
  renderSelect(result);
  renderGallery(result);
  renderFavorites(result);
  addViewControl(result);
});
