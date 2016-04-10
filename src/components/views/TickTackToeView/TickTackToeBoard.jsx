import React from 'react';
import { connect } from 'react-redux';

import TickTackToeCell from './TickTackToeCell';

const isWinRow = (cell1,cell2,cell3) => {
    if (
        typeof cell1 !== 'undefined' &&
        typeof cell2 !== 'undefined' &&
        typeof cell3 !== 'undefined' &&
        cell1 === cell2 &&
        cell2 === cell3 &&
        cell1 === cell3
    ) {
        return true;
    }
    return false;
}

const verticalWin = (selectedCells, rowNum) => {
    return isWinRow(
        selectedCells[1 + (rowNum - 1) * 3],
        selectedCells[2 + (rowNum - 1) * 3],
        selectedCells[3 + (rowNum - 1) * 3]
    );
}

const horizontalWin = (selectedCells, colNum) => {
    return isWinRow(
        selectedCells[1 + (colNum - 1)],
        selectedCells[2 + (colNum - 1) * 3],
        selectedCells[3 + (colNum - 1) * 3]
    );
}

const isWinningState = (selectedCells) => {
    if (
        verticalWin(selectedCells,1) ||
        verticalWin(selectedCells,2) ||
        verticalWin(selectedCells,3) ||
        horizontalWin(selectedCells,1) ||
        horizontalWin(selectedCells,2) ||
        horizontalWin(selectedCells,3)
    ) {
        console.log('win!');
    }
    return selectedCells;
}

const TickTackToeBoard = ({selectedCells}) => {
    console.log(isWinningState(selectedCells));

    return <table className="tick-tack-toe-board">
        <tbody>
            <tr>
                <TickTackToeCell position="1"/>
                <TickTackToeCell position="2"/>
                <TickTackToeCell position="3"/>
            </tr>
            <tr>
                <TickTackToeCell position="4"/>
                <TickTackToeCell position="5"/>
                <TickTackToeCell position="6"/>
            </tr>
            <tr>
                <TickTackToeCell position="7"/>
                <TickTackToeCell position="8"/>
                <TickTackToeCell position="9"/>
            </tr>
        </tbody>
    </table>;
};

const mapStateToProps = (state) => {
    return {
        selectedCells: state.board.selectedCells
    };
}

export default connect(mapStateToProps)(TickTackToeBoard);

// 1,2,3
    // + 0
    // + 3
    // + 6

// 1,4,7
    // + 0
    // + 1
    // + 2

// 1,5,9

// 3,5,7
