import React from 'react';
import { connect } from 'react-redux';

import { resetGame } from '../../../state-logic/tickTackToe/actions';

const TickTackToeResettButton = ({resetGame}) => {
    return <button onClick={resetGame}>Reset</button>
};

const mapStateToProps = () => {
    return {};
}


const mapDispatchToProps = (dispatch) => {
    return {
        resetGame() {
            dispatch(resetGame());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TickTackToeResettButton);
