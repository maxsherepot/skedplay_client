const { Component } = require('react');
const { GoogleMap, DirectionsService, DirectionsRenderer } = require("@react-google-maps/api");

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

    return (
      <div className='map-container'>
        <GoogleMap
          // required
          id='direction-example'
          // required
          mapContainerStyle={{
            height: '400px',
            width: '100%'
          }}
          // required
          zoom={2}
          // required
          center={{
            lat: 0,
            lng: -180
          }}
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