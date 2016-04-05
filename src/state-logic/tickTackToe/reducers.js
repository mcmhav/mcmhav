import {
    SET_PIECE
} from './actions'

const initialState = {
    selectedCells: []
}

export const board = (state = initialState, action) => {
    switch (action.type) {
        case SET_PIECE:
            return Object.assign(
                {},
                state,
                state.selectedCells.push(action.position)
            );
        default:
            return state;
    }
}
