import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import { setPiece } from '../../../state-logic/tickTackToe/actions'

const onCellClick = (position, selectedCells, dispatch) => {
    if (selectedCells.indexOf(position) < 0) {
        dispatch(setPiece(position));
    }
};

const isSelected = (selectedCells, position) => {
    return selectedCells.indexOf(position) < 0;
};

const TickTackToeCell = props => {
    const selected = isSelected(props.selectedCells, props.position);

    const cellClasses = classnames('tick-tack-toe-cell');
    return <td onClick={
            onCellClick.bind(
                null,
                props.position,
                props.selectedCells,
                props.dispatch
            )
        }
        className={ cellClasses }>
    </td>;
};

const mapStateToProps = state => {
    return {
        selectedCells: state.board.selectedCells
    };
}

export default connect(mapStateToProps)(TickTackToeCell);
