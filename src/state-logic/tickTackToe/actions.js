export const SET_PIECE = 'SET_PIECE'

let picesSet = 0

export const setPiece = (position) => {
    return {
        type: SET_PIECE,
        id: picesSet++,
        position
    }
}
