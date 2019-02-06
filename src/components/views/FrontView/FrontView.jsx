import React,{ Component } from 'react';
import ReactSVG from 'react-svg'

import './FrontView.less'

class FrontView extends Component {

    constructor() {
        super();

        this.state = {
            width: 0,
            height: 0,
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        console.log('mounted')
        this.updateWindowDimensions();
        window.addEventListener('resize',this.updateWindowDimensions);
    }

    componentWillUnmount() {
        console.log('unmounted')
        window.removeEventListener('resize',this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth,height: window.innerHeight });
    }

    render() {
        const { width,height } = this.state;

        return <div className="front-view">
            <ReactSVG
                src="assets/output.svg"
                evalScripts="always"
                onInjected={svg => {
                    console.log('onInjected',svg)

                    var polies = svg.querySelectorAll('g polygon');
                    var getRandomInt = (max,min = 0) => {
                        return Math.floor(Math.random() * (max - min + 1)) + min;
                    }

                    var randomRotatSvg = () => {
                        polies.forEach((poly) => {
                            var randomDeg = getRandomInt(3);
                            poly.style.transform = 'rotate(' + randomDeg + 'deg)'
                        })
                    }

                    const rotateInterval = setInterval(randomRotatSvg,100)

                }}
                renumerateIRIElements={false}
                svgClassName="svg-class-name"
                svgStyle={{ width,height }}
                className="svg-wrapper"
                onClick={() => {
                    console.log('wrapper onClick')
                }}
            />
        </div>
    }
};

export default FrontView;
