import React, { Component } from 'react'
import { GoogleMap, LoadScript, MarkerClusterer, Marker } from '@react-google-maps/api'

function MapWithMarkers({ markers, mapContainerStyle, zoom, center, showLabel }) {
  return (
    <GoogleMap
      id="marker-example"
      mapContainerStyle={mapContainerStyle || {}}
      zoom={zoom || 7}
      center={center || {lat: 46.8181877, lng: 8.2275124}}
    >
      <MarkerClusterer
        // options={}
      >
        {
          (clusterer) => markers.map((marker, i) => (
            <Marker
              key={i}
              position={{lat: marker.lat, lng: marker.lng}}
              clusterer={clusterer}
              label={showLabel ? {
                text: marker.name,
                // color: "#FF3366"
              } : undefined}
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