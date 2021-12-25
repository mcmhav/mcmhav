/*global google:true*/
/**
 * packages:
 *  - @googlemaps/js-api-loader
 */

import React, { Component } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import env from '../../env';

import './styles.css';

const { MAP_API_KEY } = env;

const OSLO = { lat: 59.9138057, lng: 10.7441073 };
const TROMSO = { lat: 69.6442642, lng: 18.9562726 };
const BAGHDAD = { lat: 33.3152, lng: 44.3661 };
const PARIS = { lat: 48.8566, lng: 2.3522 };
const SEOUL = { lat: 37.5665, lng: 126.978 };

function loadScript(callback) {
  const loader = new Loader({
    apiKey: MAP_API_KEY,
    version: 'weekly',
  });
  loader.load().then(() => {
    callback();
  });
}

function hashCode(str) {
  // java String#hashCode
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

function intToRGB(i) {
  var c = (i & 0x00ffffff).toString(16).toUpperCase();

  return '#' + '00000'.substring(0, 6 - c.length) + c;
}

class Map extends Component {
  constructor() {
    super();
    this.state = {
      distances: [],
    };
  }

  getDistances = async () => {
    return new Promise((resolve, reject) => {
      fetch('https://strava-activites-dot-cake-mcmhav.appspot.com/activites')
        .then(res => {
          return res.json();
        })
        .then(jsonRes => {
          const distances = [];
          jsonRes.forEach(distance => {
            distances.push({
              ...distance,
              color: intToRGB(hashCode(distance.userId)),
            });
          });
          resolve(distances);
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  waitForGoogleMapsStuff = () => {
    setTimeout(() => {
      if (!google.maps.geometry) {
        this.waitForGoogleMapsStuff();
      } else {
        this.googleDoneLoading();
      }
    }, 1000);
  };

  addFractionPath = (fromLocation, toLocation, fraction, color) => {
    const fractionLocation = google.maps.geometry.spherical.interpolate(
      fromLocation,
      toLocation,
      fraction,
    );
    this.addPath(fromLocation, fractionLocation, color);

    return fractionLocation;
  };

  addFractionDistances = (from, to, distances) => {
    let currentTo = 0;
    let toLocation = to[currentTo];
    let fromLocation = from;
    let totalDistanceLeft =
      google.maps.geometry.spherical.computeDistanceBetween(from, toLocation) / 1000;

    distances.forEach(({ distance, color }) => {
      let distanceLeft = distance;
      let fraction = distanceLeft / totalDistanceLeft;
      if (fraction > 1) {
        fromLocation = this.addFractionPath(fromLocation, toLocation, 1, color);

        currentTo += 1;
        toLocation = to[currentTo];
        distanceLeft = distanceLeft - totalDistanceLeft;
        totalDistanceLeft =
          google.maps.geometry.spherical.computeDistanceBetween(
            fromLocation,
            toLocation,
          ) / 1000;
        fraction = distanceLeft / totalDistanceLeft;
      }
      const fractionLocation = this.addFractionPath(
        fromLocation,
        toLocation,
        fraction,
        color,
      );

      totalDistanceLeft -= distanceLeft;
      fromLocation = fractionLocation;
    });
  };

  addUserLegends = distances => {
    const mapLegend = document.getElementById('map-legend');

    distances.forEach(({ firstname, lastname, color }) => {
      const div = document.createElement('div');
      div.className = 'legend-row';

      const name = document.createElement('span');
      name.className = 'legend-name';
      const textNode = document.createTextNode(`${firstname} ${lastname}:`);
      name.appendChild(textNode);
      div.appendChild(name);

      const cirlce = document.createElement('span');
      cirlce.className = 'legend-color-circle';
      cirlce.style.backgroundColor = color;

      div.appendChild(cirlce);

      mapLegend.appendChild(div);
    });
  };

  googleDoneLoading = async () => {
    const from = new google.maps.LatLng(OSLO);
    const tos = [
      new google.maps.LatLng(TROMSO),
      new google.maps.LatLng(BAGHDAD),
      new google.maps.LatLng(SEOUL),
      new google.maps.LatLng(PARIS),
    ];

    const distances = await this.getDistances();

    this.addFractionDistances(from, tos, distances);

    this.addUserLegends(distances);

    document.getElementById('map').style.position = '';
    document.getElementById('map').style.hidden = '';
  };

  addPath = (from, to, color, strokeOpacity = 1.0) => {
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
      zoom: 3,
    });

    // TODO: should not need this
    this.addPath(OSLO, TROMSO, '#FF0000', 0.4);

    this.waitForGoogleMapsStuff();
  };

  componentDidMount() {
    loadScript(this.initMap);
  }

  render() {
    return (
      <div>
        <div id="map" />
        <div id="map-legend" />
      </div>
    );
  }
}

export default Map;
