import update from 'react-addons-update'
import {
    SET_PIECE
} from './actions'

const initialState = {
    selectedCells: {}
}

export const board = (state = initialState, action) => {
    switch (action.type) {
        case SET_PIECE:
            return update(
                state, {
                    selectedCells: {
                        $merge: {
                            [action.position]: action.id  % 2
                        }
                    }
                }
            );
        default:
            return state;
    }
}
