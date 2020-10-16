import MapDirection from "components/maps/MapDirection";
import MapWithMarkers from "components/maps/MapWithMarkers";
import React from "react";

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

    const lat = (this.props.employee.current_club && this.props.employee.current_club.lat)
      || this.props.employee.current_lat
      || this.props.employee.lat;

    const lng = (this.props.employee.current_club && this.props.employee.current_club.lng)
      || this.props.employee.current_lng
      || this.props.employee.lng;

    if (!lat || !lng) {
      return '';
    }

    if (this.state.geoPositionAvailable) {
      return (
        <MapDirection
          originByGeo={true}
          destination={{lat, lng}}
        />
      );
    }

    return (
      <MapWithMarkers
        goBtn={this.props.goBtn}
        goBtnLeft={this.props.goBtnLeft || false}
        markers={[this.props.employee]}
        center={{lat, lng}}
        destination={{lat, lng}}
        mapContainerStyle={{width: '100%', height: '400px'}}
      />
    );
  }
}

export default EmployeeMaps;