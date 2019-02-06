import update from 'react-addons-update';
import { SET_PIECE, WIN, RESET } from './actions';

const initialState = {
  selectedCells: {},
};

export const board = (state = initialState, action) => {
  switch (action.type) {
    case SET_PIECE:
      return update(state, {
        selectedCells: {
          $merge: {
            [action.position]: action.id % 2,
          },
        },
      });
    case WIN:
      return update(state, {
        selectedCells: {
          $merge: {
            [action.position]: action.id % 2,
          },
        },
      });
    case RESET:
      return update(state, {
        selectedCells: {
          $apply() {
            return {};
          },
        },
      });
    default:
      return state;
  }
};
