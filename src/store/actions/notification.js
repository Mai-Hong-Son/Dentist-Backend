export const listNotification = (criterial, ...etc) => ({
  type: 'notification/list',
  args: [criterial, ...etc]
});

export const initNotification = () => ({
  type: 'notification/init'
});

export const loadMoreNotification = (criterial, ...etc) => ({
  type: 'notification/loadMore',
  payload: { criterial, ...etc }
});

export const deleteNotification = (id, ...etc) => ({
  type: 'notification/delete',
  args: [{ id }, ...etc]
});

export const deleteAllNotification = (...etc) => ({
  type: 'notification/delete/all',
  args: [...etc]
});

export const markAsReadNotification = ({ id }, ...etc) => ({
  type: 'notification/read',
  args: [{ id }, ...etc]
});
