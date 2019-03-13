const intitalState = {
  notifications: {
    total: 0
  },
  question: {
    tabSelection: null,
    tabs: [],

    filters: {
      status: -1,
      service_id: 0
    }
  },
  sidebar: {
    isOpen: false
  }
};

export default (state = intitalState, action) => {
  switch (action.type) {
    case 'screen/payload':
      return {
        ...state,
        [action.screen]: {
          ...state[action.screen],
          ...action.payload
        }
      };
    default:
  }

  return state;
};
