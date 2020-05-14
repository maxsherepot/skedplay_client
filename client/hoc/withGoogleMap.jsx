import {useLoadScript} from "@react-google-maps/api";
import React from "react";

const libraries = ['places'];

export default (WrappedComponent) => {
  return (props) => {
    if (typeof document === "undefined") {
      return null;
    }

    const { isLoaded, loadError } = useLoadScript({
      googleMapsApiKey: process.env.GOOGLE_MAP_KEY,
      libraries,
      loadingElement: <div/>
    });

    if (!isLoaded || loadError) {
      return null;
    }

    return (
      <WrappedComponent {...props}/>
    );
  }
};