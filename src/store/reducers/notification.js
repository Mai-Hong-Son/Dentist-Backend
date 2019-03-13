const initialState = {
  isLoadMore: false,
  refreshing: false,
  criterial: {
    page: 1,
    page_size: 10
  },
  data: {
    items: [],
    current: 1,
    total: 1,
    limit: 10
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'notification/updateList':
      return {
        ...state,
        data: action.payload.data,
        criterial: {
          ...state.criterial,
          page: action.payload.current,
          total: action.payload.total,
          limit: action.payload.limit
        },
      };

    case 'notication/refreshing':
      return {
        ...state,
        refreshing: true
      };
    case 'notification/stopRefreshing':
      return {
        ...state,
        refreshing: false
      };

    case 'notification/startLoadMore':
      return {
        ...state,
        isLoadMore: true
      };
    case 'notification/stopLoadMore':
      return {
        ...state,
        isLoadMore: false
      };

    default:
      //
      break;
  }

  return state;
};
