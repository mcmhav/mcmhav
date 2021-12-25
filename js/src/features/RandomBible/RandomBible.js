import React, { Component } from 'react';
import './index.css';

class RandomBible extends Component {
  constructor() {
    super();

    this.state = {
      verse: {
        details: {
          text: '',
        },
      },
    };
  }

  async getVerse() {
    try {
      const res = await fetch(
        'https://beta.ourmanna.com/api/v1/get/?format=json&order=random',
      ).then(rez => rez.json());
      console.log(res);
      this.setState({ verse: res.verse });
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    document.onkeydown = ({ code }) => {
      console.log('Code:', code);
      switch (code) {
        case 'PageDown':
        case 'PageUp':
        case 'ArrowRight':
          this.getVerse();
          break;
        default:
          break;
      }
    };

    this.getVerse();
  }
  render() {
    const { verse } = this.state;
    console.log(verse);
    return (
      <div className="bible">
        <div>{verse.details.text}</div>
      </div>
    );
  }
}

export default RandomBible;
