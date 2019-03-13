import { all, takeEvery } from 'redux-saga/effects';
import { createRequestSaga } from './common';
import API from '../api/gallery';

const requestGallery = createRequestSaga({
  request: API.all,
  tokenRequired: true
});

const requestGalleryDetail = createRequestSaga({
  request: API.detail,
  tokenRequired: true
});

export default [
  function* galleryWatchers() {
    yield all([
      takeEvery('gallery/all', requestGallery),
      takeEvery('gallery/detail', requestGalleryDetail),
    ]);
  }
];
