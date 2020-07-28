/*global google:true*/

import React, { Component } from 'react';
import env from '../../env';

import './styles.css';

const { MAP_API_KEY } = env;
const MAPS_URL = `https://maps.googleapis.com/maps/api/js?key=${MAP_API_KEY}&callback=testur`;

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
const BAGHDAD = { lat: 33.3152, lng: 44.3661 };

function loadScript(scriptUrl, callback) {
  const mapsApiScript = document.getElementById('maps-api-script');
  if (!mapsApiScript) {
    const script = document.createElement('script');
    script.src = scriptUrl;
    script.id = 'maps-api-script';
    // script.async = true;
    // script.defer = true;
    window.testur = callback;
    document.body.appendChild(script);
  } else {
    callback();
  }
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
          console.log(jsonRes);
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
    //console.log('totalDistanceLeft:', totalDistanceLeft);
    //console.log('distance:', distance);
    //console.log('fractionLocation:', fractionLocation);

    this.addPath(fromLocation, fractionLocation, color);

    return fractionLocation;
  };

  addFractionDistances = (from, to, distances) => {
    //const distance = google.maps.geometry.spherical.computeDistanceBetween(from, to);
    let currentTo = 0;
    let toLocation = to[currentTo];
    let fromLocation = from;
    let totalDistanceLeft =
      google.maps.geometry.spherical.computeDistanceBetween(from, toLocation) / 1000;
    distances.forEach(({ distance, color }) => {
      let fraction = distance / totalDistanceLeft;
      if (fraction > 1) {
        fromLocation = this.addFractionPath(fromLocation, toLocation, 1, color);

        currentTo += 1;
        toLocation = to[currentTo];
        totalDistanceLeft =
          google.maps.geometry.spherical.computeDistanceBetween(
            fromLocation,
            toLocation,
          ) / 1000;
        fraction = (distance * (fraction - 1)) / totalDistanceLeft;
      }
      const fractionLocation = this.addFractionPath(
        fromLocation,
        toLocation,
        fraction,
        color,
      );

      totalDistanceLeft -= distance;
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
    const to = new google.maps.LatLng(TROMSO);
    const tos = [to, new google.maps.LatLng(BAGHDAD)];

    const distances = await this.getDistances();

    this.addFractionDistances(from, tos, distances);

    this.addUserLegends(distances);

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

    this.waitForGoogleMapsStuff();
  };

  componentDidMount() {
    loadScript(MAPS_URL, this.initMap);
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
