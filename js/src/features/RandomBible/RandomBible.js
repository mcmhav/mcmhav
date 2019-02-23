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
      // fetch('https://beta.ourmanna.com/api/v1/get/?format=json&order=random', {
      //   // const res = await fetch('http://labs.bible.org/api/?passage=random', {
      //   // mode: 'no-cors',
      //   // headers: {
      //   //   Accept:
      //   //     'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      //   // },
      // })
      //   .then(rez => rez.json())
      //   .then(console.log);
      // return;
      const res = await fetch(
        'https://beta.ourmanna.com/api/v1/get/?format=json&order=random',
        {
          // const res = await fetch('http://labs.bible.org/api/?passage=random', {
          // mode: 'no-cors',
          // headers: {
          //   Accept:
          //     'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
          // },
        },
      ).then(rez => rez.json());
      // const text = await res.json();
      const text = res;
      // const json = await res.json();

      console.log(res);
      this.setState({ verse: res.verse });
      // console.log(res.status);
      // console.log(res.headers.get('Content-Type'));
      // console.log(text);
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    document.onkeydown = ({ code }) => {
      switch (code) {
        case 'PageDown':
          console.log('dooown');
        case 'PageUp':
          console.log('uppp');
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
