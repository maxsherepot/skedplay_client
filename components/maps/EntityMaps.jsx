import MapDirection from "components/maps/MapDirection";
import MapWithMarkers from "components/maps/MapWithMarkers";
import React from "react";

const { Component } = require('react');

class EntityMaps extends Component {
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

    if (this.props.entity.lat === null || this.props.entity.lng === null) {
      return '';
    }

    if (this.state.geoPositionAvailable) {
      return (
        <MapDirection
          originByGeo={true}
          destination={{lat: this.props.entity.lat, lng: this.props.entity.lng}}
          height={this.props.height || '100%'}
          black={true}
          goBtnLeft={this.props.goBtnLeft || false}
        />
      );
    }

    return (
      <MapWithMarkers
        goBtn={true}
        goBtnLeft={this.props.goBtnLeft || false}
        markers={[{lat: this.props.entity.lat, lng: this.props.entity.lng}]}
        center={{lat: this.props.entity.lat, lng: this.props.entity.lng}}
        destination={{lat: this.props.entity.lat, lng: this.props.entity.lng}}
        mapContainerStyle={{
            width: '100%',
            height: this.props.height || '100%'
        }}
        height={this.props.height || '100%'}
      />
    );
  }
}

export default EntityMaps;