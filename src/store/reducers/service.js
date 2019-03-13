const initialState = {
  items: [],
  loaded: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'service/cache':
      return {
        ...state,
        items: action.payload,
        loaded: true,
      };

    default:
  }

  return state;
};

