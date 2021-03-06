export const SET_PIECE = 'SET_PIECE';
export const WIN = 'WIN';
export const RESET = 'RESET';

let picesSet = 0;

export const setPiece = (position) => {
    return {
        type: SET_PIECE,
        id: picesSet++,
        position
    }
}

export const gameOver = (position) => {
    return {
        type: WIN,
        id: picesSet++,
        position
    }
}

export const resetGame = () => {
    return {
        type: RESET
    }
}
