import React from 'react';

import './PartyView.less'

const PartyView = () => {
    let lol = 0;

    setInterval(function(){
        if (lol % 2){
            document.querySelector('body').style.backgroundColor = 'black';
        } else {
            document.querySelector('body').style.backgroundColor = 'white';
        }
        lol++;
    }, 100);

    return <div className="party-view">
    </div>
};

export default PartyView;
