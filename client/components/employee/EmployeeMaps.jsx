import MapDirection from "components/maps/MapDirection";
import MapWithMarkers from "components/maps/MapWithMarkers";

const { Component } = require('react');

class EmployeeMaps extends Component {
  constructor (props) {
    super(props);

    this.state = {
      geoWatchId: null,
      geoPositionAvailable: false,
    };
  }

  componentDidMount() {
    this.state.geoWatchId = navigator.geolocation.watchPosition(position => {
      this.setState({
        geoPositionAvailable: true
      });
    }, error => {
      if (error.code === error.PERMISSION_DENIED) {
        this.setState({
          geoPositionAvailable: false
        });
      }
    })
  }

  componentWillUnmount() {
    if (this.state.geoWatchId) {
      navigator.geolocation.clearWatch(this.state.geoWatchId);
    }
  }

  render () {
    if (typeof navigator === "undefined") {
      return '';
    }

    if (this.props.employee.lat === null || this.props.employee.lng === null) {
      return '';
    }

    if (this.state.geoPositionAvailable) {
      return (
        <MapDirection
          originByGeo={true}
          destination={{lat: this.props.employee.lat, lng: this.props.employee.lng}}
        ></MapDirection>
      );
    }

    return (
      <MapWithMarkers
        markers={[this.props.employee]}
        center={{lat: this.props.employee.lat, lng: this.props.employee.lng}}
        mapContainerStyle={{width: '100%', height: '400px'}}
      ></MapWithMarkers>
    );
  }
}

export default EmployeeMaps;