import React from 'react';

import TickTackToeCell from './TickTackToeCell';

const TickTackToeBoard = () => {
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

export default TickTackToeBoard;
