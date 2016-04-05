import React from 'react';

const MenuItem = props => {
    return <a className="main-menu-item" href={ props.href }>
        <span className="main-menu-icon"></span>
        <span className="main-menu-label">{ props.displayName }</span>
    </a>;
};

export default MenuItem;
