/*global google:true*/

import React, { Component } from 'react';
import './styles.css';

const API_KEY = 'THE_KEYY';
const MAPS_URL = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=testur`;

const TOTAL_LENGTH_KM = 1735;

const TEST_LENGTH_RUN_KM = 120;
const TEST_DISTANCES = [
  {
    distance: 120,
    color: '#0000FF',
  },
  {
    distance: 300,
    color: '#00FFFF',
  },
];

const OSLO = { lat: 59.9138057, lng: 10.7441073 };
const TROMSO = { lat: 69.6442642, lng: 18.9562726 };

function loadScript(scriptUrl, callback) {
  const script = document.createElement('script');
  script.src = scriptUrl;
  // script.async = true;
  // script.defer = true;
  window.testur = callback;
  document.body.appendChild(script);
}

class Map extends Component {
  constructor() {
    super();
  }

  waitForGoogleMapsStuff = () => {
    setTimeout(() => {
      if (!google.maps.geometry) {
        this.waitForGoogleMapsStuff();
      } else {
        this.googleDoneLoading();
      }
    }, 1000);
  };

  addFractionDistances = (from, to, distances, totalDistance) => {
    let fromLocation = from;
    distances.forEach(({ distance, color }) => {
      const fractionLocation = google.maps.geometry.spherical.interpolate(
        fromLocation,
        to,
        distance / (totalDistance / 1000),
      );

      this.addPath(fromLocation, fractionLocation, color);

      fromLocation = fractionLocation;
    });
  };

  googleDoneLoading = () => {
    const from = new google.maps.LatLng(OSLO);
    const to = new google.maps.LatLng(TROMSO);

    const distance = google.maps.geometry.spherical.computeDistanceBetween(from, to);
    console.log(distance);

    this.addFractionDistances(from, to, TEST_DISTANCES, distance);

    document.getElementById('map').style.position = '';
    document.getElementById('map').style.hidden = '';
  };

  addPath = (from, to, color, strokeOpacity: 1.0) => {
    var flightPlanCoordinates = [from, to];
    var flightPath = new google.maps.Polyline({
      path: flightPlanCoordinates,
      geodesic: true,
      strokeColor: color,
      strokeOpacity: strokeOpacity,
      strokeWeight: 10,
    });

    flightPath.setMap(this.map);
  };

  initMap = () => {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: {
        lat: 64.9333903,
        lng: 14.9213556,
      },
      zoom: 5.89,
    });

    this.addPath(OSLO, TROMSO, '#FF0000', 0.4);

    if (!google.maps.geometry) {
      this.waitForGoogleMapsStuff();
    }
  };

  componentDidMount() {
    loadScript(MAPS_URL, this.initMap);
  }
  render() {
    return (
      <div>
        <div id="map" />
      </div>
    );
  }
}

export default Map;
