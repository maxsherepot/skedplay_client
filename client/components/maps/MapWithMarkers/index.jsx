import React, { Component } from 'react'
import { GoogleMap, LoadScript, MarkerClusterer, Marker } from '@react-google-maps/api'
import cx from "classnames";

function MapWithMarkers({ markers, mapContainerStyle, zoom, center, showLabel, goBtn, goBtnLeft, destination, height }) {
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
    <div className='map-container relative' style={{height: height || '400px'}}>

      {goBtn &&
        <div className={cx([
          `absolute top-0 pt-5`,
          `${goBtnLeft ? 'left-0 pl-2' : 'right-0 pr-2'}`,
        ])}>
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${destination.lat},${destination.lng}`}
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
      }

      <GoogleMap
        id="marker-example"
        mapContainerStyle={mapContainerStyle || {}}
        zoom={zoom || 7}
        center={center || {lat: 46.8181877, lng: 8.2275124}}
        options={options}
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

    </div>
  )
}

export default MapWithMarkers;