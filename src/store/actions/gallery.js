export const fetchGallery = (criterial, ...etc) => ({
  type: 'gallery/all',
  args: [criterial, ...etc]
});

export const fetchGalleryDetail = (id, ...etc) => ({
  type: 'gallery/detail',
  args: [id, ...etc]
});
