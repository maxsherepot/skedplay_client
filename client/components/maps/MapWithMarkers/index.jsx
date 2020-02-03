import React, { Component } from 'react'
import { GoogleMap, LoadScript, MarkerClusterer, Marker } from '@react-google-maps/api'

function MapWithMarkers({ markers, mapContainerStyle, zoom, center }) {
  const options = {
    imagePath:"/static/img/info.png"
  };

  // google.maps.MarkerLabel

  const getLink = (girl) => {
    if (girl.soon) {
      return '';
    }

    return `/employees/${girl.id}/information`;
  };

  return (
    <GoogleMap
      id="marker-example"
      mapContainerStyle={mapContainerStyle || {}}
      zoom={zoom || 7}
      center={center || {lat: 46.8181877, lng: 8.2275124}}
    >
      <MarkerClusterer
        options={options}
      >
        {
          (clusterer) => markers.map((marker, i) => (
            <Marker
              key={i}
              position={{lat: marker.lat, lng: marker.lng}}
              clusterer={clusterer}
              label={{
                text: marker.name,
                // color: "#FF3366"
              }}
              // icon={{
              //   url: '/static/img/pin.png',
              //   // size: new google.maps.Size(24, 24),
              //   size: new google.maps.Size(47, 43),
              //   labelOrigin: new google.maps.Point(88, 22)
              // }}
            />
          ))
        }
      </MarkerClusterer>
    </GoogleMap>
  )
}

export default MapWithMarkers;