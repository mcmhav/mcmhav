import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import { setPiece } from '../../../state-logic/tickTackToe/actions'

const isSelected = (selectedCells, position) => {
    return typeof selectedCells[position] !== 'undefined';
};

const getPieceType = (pieceType) => {
    switch(pieceType){
        case 0:
            return 'circle';
        case 1:
            return 'cross';
        default:
            return '';
    }
}

const TickTackToeCell = ({selectedCells, position, onClick}) => {
    const selected = isSelected(selectedCells, position);

    const cellClasses = classnames({
        'ticked': selected
    }, getPieceType(selectedCells[position]), 'tick-tack-toe-cell');

    return <td onClick={e => {
            e.preventDefault()
            onClick(selectedCells)
        }}
        className={ cellClasses }>
    </td>;
};

const mapStateToProps = (state) => {
    return {
        selectedCells: state.board.selectedCells
    };
}

const mapDispatchToProps = (dispatch, {
    position
}) => {
    return {
        onClick: (selectedCells) => {
            if (typeof selectedCells[position] === 'undefined') {
                dispatch(setPiece(position));
            }
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TickTackToeCell);
