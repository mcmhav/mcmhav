import React from 'react';
import Menu from './MainMenu/Menu';
import { connect } from 'react-redux';

class MainComponent extends React.Component {
    render() {
        return (
            <div className="index">
                <Menu/>
                <div className="view-body">
                    { this.props.children }
                </div>
            </div>
        );
    }
}

export default connect()(MainComponent);
