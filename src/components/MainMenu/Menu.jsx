import React from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';

import  MenuItem from './MenuItem';

import './MainMenu.less'

const menuItems = [{
        displayName: 'Front',
        href: '#/front'
    }, {
        displayName: 'TodoList',
        href: '#/todo'
    }, {
        displayName: 'Info',
        href: '#/info'
    }, {
        displayName: 'TickTackToe',
        href: '#/tick-tack-toe'
    }
];

const Menu = () => {
    return <div className="main-menu">
        { menuItems.map(menuItem => {
            return <MenuItem key={ menuItem.displayName } { ...menuItem }/>
        }) }
    </div>
};

const mapStateToProps = state => {
    return {
        q: state.router.location.query.q
    };
}

export default connect(mapStateToProps, {pushState})(Menu);
