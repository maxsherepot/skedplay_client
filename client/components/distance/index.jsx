import {Children, Component} from "react";
import { DistanceMatrixService } from '@react-google-maps/api';

class Distance extends Component {
  constructor(props) {
    super(props);

    this.state = {
      response: null,
      origin: null,
      destination: '',
      geoWatchId: null,
    };

    this.state.destination = new google.maps.LatLng(props.destination.lat, props.destination.lng);
    this.defaultCallback = this.defaultCallback.bind(this);
  }

  componentDidMount() {
    if (this.props.originByGeo) {
      this.geoWatchId = navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          response: null,
          origin: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
        });
      });
    } else {
      this.state.origin = new google.maps.LatLng(props.origin.lat, props.origin.lng);
    }
  }

  componentWillUnmount() {
    if (this.state.geoWatchId) {
      navigator.geolocation.clearWatch(this.state.geoWatchId);
    }
  }

  defaultCallback(response) {
    this.setState({response});
  }

  render() {
    // if (!this.state.origin) {
    //   return '';
    // }

    let distanceText = null;
    let distanceValue = null;
    let distanceKm = null;

    if (
      !this.props.callback
      && this.state.response
    ) {
      try {
        distanceValue = this.state.response.rows[0].elements[0].distance.value;
        distanceText = this.state.response.rows[0].elements[0].distance.text;
        distanceKm = Math.round(distanceValue / 1000 * 10) / 10;
      } catch (e) {
        // console.log('distance error', e, this.state.response);
      }
    }

    const children = Children.map(this.props.children, (child, index) => {
      return React.cloneElement(child, {
        distanceText,
        distanceValue,
        distanceKm,
      });
    });

    return (
      <>
        {(!this.state.response && this.state.origin) &&
          <DistanceMatrixService
            callback={response => {
              this.defaultCallback(response);
              this.props.callback ? this.props.callback(response, distanceText) : null;
            }}
            options={{
              origins: [this.state.origin],
              destinations: [this.state.destination],
              travelMode: 'DRIVING',
              // unitSystem: 'metric'
            }}
          />
        }
        {children}
      </>
    );
  }
}

export default Distance;
