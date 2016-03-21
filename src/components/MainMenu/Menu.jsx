import React from 'react';

import './MainMenu.less'

const Menu = () => {
    return <div className="main-menu">
        <a className="main-menu-item" href="#/front">
            <span className="main-menu-icon"></span>
            <span className="main-menu-label">lol</span>
        </a>
        <a className="main-menu-item" href="#/info">
            <span className="main-menu-icon"></span>
            <span className="main-menu-label">lul</span>
        </a>
        <a className="main-menu-item" href="#/todo">
            <span className="main-menu-icon"></span>
            <span className="main-menu-label">TodoList</span>
        </a>
    </div>
};

export default Menu;
