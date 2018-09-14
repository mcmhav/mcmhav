import React from 'react';

import TickTackToeBoard from './TickTackToeBoard';
import TickTackToeResettButton from './TickTackToeResettButton';

import './TickTackToeView.less';

const InfoView = () => {
    return <div className="tick-tack-toe-view">
        <TickTackToeBoard />
        <TickTackToeResettButton />
    </div>
};

export default InfoView;
