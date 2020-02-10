import React from "react";

const { Component } = require('react');
const { GoogleMap, DirectionsService, DirectionsRenderer } = require("@react-google-maps/api");

import cx from 'classnames';

class MapDirection extends Component {
  constructor (props) {
    super(props);

    this.state = {
      response: null,
      travelMode: 'DRIVING',
      origin: '',
      destination: '',
      geoWatchId: null,
    };

    if (props.originByGeo) {
      this.geoWatchId = navigator.geolocation.watchPosition(position => {
        this.setState({
          response: null,
          origin: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
        });
      });
    } else {
      this.state.origin = new google.maps.LatLng(props.origin.lat, props.origin.lng);
    }

    this.state.destination = new google.maps.LatLng(props.destination.lat, props.destination.lng);

    this.directionsCallback = this.directionsCallback.bind(this);
  }

  componentWillUnmount() {
    if (this.state.geoWatchId) {
      navigator.geolocation.clearWatch(this.state.geoWatchId);
    }
  }

  directionsCallback (response) {
    if (response !== null) {
      if (response.status === 'OK') {
        this.setState(
          () => ({
            response
          })
        )
      } else {
        console.log('response: ', response)
      }
    }
  }

  render () {
    if ((!this.props.origin && !this.props.originByGeo) || !this.props.destination) {
      return '';
    }

    const blackStyles = [
      {
        elementType: "geometry",
        stylers: [
          {
            color: "#212121"
          }
        ]
      },
      {
        elementType: "labels.icon",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#757575"
          }
        ]
      },
      {
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#212121"
          }
        ]
      },
      {
        featureType: "administrative",
        elementType: "geometry",
        stylers: [
          {
            color: "#757575"
          }
        ]
      },
      {
        featureType: "administrative.country",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#9e9e9e"
          }
        ]
      },
      {
        featureType: "administrative.land_parcel",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#bdbdbd"
          }
        ]
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#757575"
          }
        ]
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [
          {
            color: "#181818"
          }
        ]
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#616161"
          }
        ]
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#1b1b1b"
          }
        ]
      },
      {
        featureType: "road",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#2c2c2c"
          }
        ]
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#8a8a8a"
          }
        ]
      },
      {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [
          {
            color: "#373737"
          }
        ]
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [
          {
            color: "#3c3c3c"
          }
        ]
      },
      {
        featureType: "road.highway.controlled_access",
        elementType: "geometry",
        stylers: [
          {
            color: "#4e4e4e"
          }
        ]
      },
      {
        featureType: "road.local",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#616161"
          }
        ]
      },
      {
        featureType: "transit",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#757575"
          }
        ]
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [
          {
            color: "#000000"
          }
        ]
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#3d3d3d"
          }
        ]
      }
    ];

    const options = {
      fullscreenControl: false,
    };

    // if (this.props.black) {
      options.zoomControl = false;
      options.styles = [...blackStyles];
    // }

    return (
      <div className='map-container relative' style={{height: this.props.height || '400px'}}>
        <div className={cx([
          `absolute top-0 pt-5`,
          `${this.props.goBtnLeft ? 'left-0 pl-2' : 'right-0 pr-2'}`,
        ])}>
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${this.props.destination.lat},${this.props.destination.lng}`}
            className="btn btn-sm btn-primary"
            target="_blank"
            style={{
              padding: '.5rem',
              fontSize: '1rem',
            }}
          >
            GO
          </a>
        </div>

        <GoogleMap
          // required
          id='direction-example'
          // required
          mapContainerStyle={{
            height: this.props.height || '400px',
            width: '100%'
          }}
          // required
          zoom={2}
          // required
          center={{
            lat: 0,
            lng: -180
          }}
          options={options}
        >
          {
            (
              this.state.destination !== '' &&
              this.state.origin !== '' &&
              this.state.response === null
            ) && (
              <DirectionsService
                // required
                options={{ // eslint-disable-line react-perf/jsx-no-new-object-as-prop
                  destination: this.state.destination,
                  origin: this.state.origin,
                  travelMode: this.state.travelMode
                }}
                // required
                callback={this.directionsCallback}
              />
            )
          }

          {
            this.state.response !== null && (
              <DirectionsRenderer
                // required
                options={{
                  directions: this.state.response
                }}
              />
            )
          }
        </GoogleMap>
      </div>
    )
  }
}

export default MapDirection;